import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { IMyDpOptions } from 'mydatepicker';

import { CourseService } from "./course.service";
import { Course } from './course.model';
import { ScoreService } from "./score.service";
import { Score } from './score.model';
import { ScoreMarked } from './score-marked.model';
import { ErrorService } from "../errors/error.service";

@Component({
  selector: 'app-score-entry-form',
  templateUrl: './score-input.component.html'
})
export class ScoreInputComponent implements OnInit {
  @Output() calculatedGHINEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() ghinTableEvent: EventEmitter<ScoreMarked[]> = new EventEmitter<ScoreMarked[]>();
  public courseList: String[] = [];
  private course: Course;
  private score: Score;
  private courses: Course[] = [];
  public scoreForm: FormGroup;
  private calculatedGHINText: string;
  private scoreTable: Score[] = [];
  private scoreTableMarked: ScoreMarked[] = [];
  private initialScoreData: Score[] = [];
  private initialCourseData: Course[] = [];

  constructor(private scoreService: ScoreService,
              private courseService: CourseService,
              private errorService: ErrorService,
              private router: Router,
              private formBuilder: FormBuilder) {}

  public scoreDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy-mm-dd',
        editableDateField: false,
        openSelectorOnInputClick: true
    };

  getScores() {
    this.scoreService.getScores()
      .subscribe(
          (userScores: Score[]) => {
            var ghinDiffList = [];
            var calculatedDiffs = [];
            var calculatedDiffsUsed = [];
            var diffAverage;
            var calculatedGhin;
            var i;
            this.scoreTable = [];
            for (let score of userScores) {
              if (score) {
                this.scoreTable.push(score);
                const scoreSlope = score.slope;
                const scoreRating = score.rating;
                const scoreEntered = score.score;
                calculatedDiffs.push(this.calculateDiff(scoreSlope, scoreRating, scoreEntered));
              }
            }
            diffAverage = this.getDiffAverage(calculatedDiffs);
            if (diffAverage.diffAvg === 0) {
               this.calculatedGHINText = "Must have at least 5 scores";
            } else {
               this.calculatedGHINText = `GHIN : ${this.calculateGHIN(diffAverage.diffAvg)}`;
            }
            this.scoreTableMarked = [];
            var isUsed;
            for (i=0; i<this.scoreTable.length; i++) {
                isUsed = true;
                var indexPos = diffAverage.diffsUsed.indexOf(i);
                if( indexPos === -1 ) {
                  isUsed = false;
                }
                this.scoreTableMarked.push({
                   used: isUsed,
                   date_played: this.scoreTable[i].date_played,
                   course: this.scoreTable[i].course,
                   slope: this.scoreTable[i].slope,
                   rating: this.scoreTable[i].rating,
                   score: this.scoreTable[i].score
                });
            }

            this.calculatedGHINEvent.emit(this.calculatedGHINText);
            this.ghinTableEvent.emit(this.scoreTableMarked);
            // console.log('Scores fetched and calculations completed');
          },
          error => console.error(error)      
      );
  };
    
  onSubmit() {
    var localCourseList = JSON.parse(localStorage.getItem('userCourses'))
    const newScoreDate = this.scoreForm.value.datePlayed.formatted;
    const newScoreCourse = this.scoreForm.value.courseName;
    const newScoreSlope = this.scoreForm.value.courseSlope;
    const newScoreRating = this.scoreForm.value.courseRating;
    const newScoreEntered = this.scoreForm.value.scoreEntered;
    const newCourse = new Course(
        newScoreCourse,
        newScoreSlope,
        newScoreRating
    );
    var numScoresBeforeAdd = 0;
    var numScoresAfterAdd = 0;

    if (localCourseList.indexOf(newScoreCourse) === -1) {
      localCourseList.push(newScoreCourse);
      if ( localCourseList.indexOf('No courses added to date') === 0 ) {
         localCourseList.shift();
      }
      const newCoursesJSON = JSON.stringify(localCourseList);
      localStorage.setItem('userCourses', newCoursesJSON);
      this.courseService.addCourse(newCourse)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
    }

    this.courseList = JSON.parse(localStorage.getItem('userCourses'));
 
    const newScore = new Score(
        newScoreDate,
        newScoreCourse,
        newScoreSlope,
        newScoreRating,
        newScoreEntered
    );
    
    var scoreAdded = false;
    this.scoreService.addScore(newScore)
        .subscribe(
            undefined,                    // onNext handler
            error => console.log(error),  // onError handler
            () => {                       // onCompletion handler
              //  console.log('Score addition complete');
               this.getScores();
            }
    );
    this.scoreForm.reset();
  }

  calculateGHIN(diffAvg) {
    var ghin;
    ghin = diffAvg*0.96;
    var upGhin = ghin * 10;
    var upGhin = Math.floor(upGhin);
    ghin = upGhin/10;
    return ghin;
  }

  calculateDiff(slope: number, rating: number, score: number) {
    return (score - rating)*113 / slope;
  }

  getDiffAverage(diffArray) {
    var diffArrayWithIndices = [];
    var i;
    for (i = 0; i < diffArray.length; i++) {
      diffArrayWithIndices.push({
         diff: diffArray[i],
         diffIndex: i
      });
    }

    var diffArraySorted = [];
    if (diffArrayWithIndices.length > 0) {
      diffArraySorted = diffArrayWithIndices.sort(function(a, b) { return a.diff-b.diff });
    }
    var diffAvg;
    var numDiffsUsed = 0;
    var diffsUsedIndices = [];
    switch (diffArraySorted.length) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
            diffAvg = 0;
            break;
          case 5:
          case 6:
            diffAvg = this.diffAverage(diffArraySorted, 1);
            numDiffsUsed = 1;
            break;
          case 7:
          case 8:
            diffAvg = this.diffAverage(diffArraySorted, 2);
            numDiffsUsed = 2;
            break;
          case 9:
          case 10:
            diffAvg = this.diffAverage(diffArraySorted, 3);
            numDiffsUsed = 3;
            break;
          case 11:
          case 12:
            diffAvg = this.diffAverage(diffArraySorted, 4);
            numDiffsUsed = 4;
            break;
          case 13:
          case 14:
            diffAvg = this.diffAverage(diffArraySorted, 5);
            numDiffsUsed = 5;
            break;
          case 15:
          case 16:
            diffAvg = this.diffAverage(diffArraySorted, 6);
            numDiffsUsed = 6;
            break;
          case 17:
            diffAvg = this.diffAverage(diffArraySorted, 7);
            numDiffsUsed = 7;
            break;
          case 18:
            diffAvg = this.diffAverage(diffArraySorted, 8);
            numDiffsUsed = 8;
            break;               
          case 19:
            diffAvg = this.diffAverage(diffArraySorted, 9);
            numDiffsUsed = 9;
            break;
          default:
            diffAvg = this.diffAverage(diffArraySorted, 10);
            numDiffsUsed = 10;
    }
    for (i=0; i<numDiffsUsed; i++) {
        diffsUsedIndices.push(diffArraySorted[i].diffIndex);
    }
    return {diffAvg: diffAvg, diffsUsed: diffsUsedIndices};
  }

  diffAverage(diffArray, numDiffsToUse) {
    var i;
    var diffSum = 0;
    for (i = 0; i < numDiffsToUse; i++) {
        diffSum = diffSum + diffArray[i].diff;
    }
    return diffSum/numDiffsToUse;
  }

  onChange(value) {
    this.courseService.getCourseByName(value)
      .subscribe(
        (course: Course) => {
          this.scoreForm.setValue({
          selectedCourse: value,
          datePlayed: null,
          courseName: course.name,
          courseSlope: course.slope,
          courseRating: course.rating,
          scoreEntered: null
        });
      },
        error => console.error(error)      
      );
  }

  onClear() {
    this.score = null;
    this.scoreForm.reset();
  }

  ngOnInit() {
    var localCourseList = [];
    var coursesJSON;
    this.scoreForm = this.formBuilder.group({
        selectedCourse: new FormControl(),
        datePlayed: [null, Validators.required],
        courseName: new FormControl(),
        courseSlope: new FormControl(),
        courseRating: new FormControl(),
        scoreEntered: new FormControl()
    });
    this.courseList.push('No courses added to date');
    coursesJSON = JSON.stringify(this.courseList);
    localStorage.setItem('userCourses', coursesJSON);
    localCourseList = JSON.parse(localStorage.getItem('userCourses'));

    if (this.initialCourseData.length === 0 ) {
        this.courseService.getCourseNames()
          .subscribe(
            (courses: Course[]) => {
              this.courseList = [];
              for (let course of courses) {
                this.courseList.push(course.name);
              }      
              if (this.courseList.length  === 0) {
                this.courseList.push('No courses added to date');
              }
              var coursesJSON = JSON.stringify(this.courseList);
              localStorage.setItem('userCourses', coursesJSON);
            },
            error => console.error(error)      
          );
    }

    this.scoreService.getScores()
      .subscribe(
          (userScores: Score[]) => {
            var ghinDiffList = [];
            var calculatedDiffs = [];
            var calculatedDiffsUsed = [];
            var diffAverage;
            var calculatedGhin;
            for (let score of userScores) {
                if (score) {
                  this.scoreTable.push(score);
                  var scoreSlope = score.slope;
                  var scoreRating = score.rating;
                  var scoreEntered = score.score;
                  calculatedDiffs.push(this.calculateDiff(scoreSlope, scoreRating, scoreEntered));
                }
            }
            diffAverage = this.getDiffAverage(calculatedDiffs);
//            console.log('calculated diff of fetched score -> ' + JSON.stringify(diffAverage));
            if (diffAverage.diffAvg === 0) {
               this.calculatedGHINText = "Must have at least 5 scores";
            } else {
               this.calculatedGHINText = `GHIN : ${this.calculateGHIN(diffAverage.diffAvg)}`;
            }
            var isUsed;
            var i;
            for (i=0; i<this.scoreTable.length; i++) {
                isUsed = true;
                var indexPos = diffAverage.diffsUsed.indexOf(i);
                if( indexPos === -1 ) {
                  isUsed = false;
                }
                this.scoreTableMarked.push({
                   used: isUsed,
                   date_played: this.scoreTable[i].date_played,
                   course: this.scoreTable[i].course,
                   slope: this.scoreTable[i].slope,
                   rating: this.scoreTable[i].rating,
                   score: this.scoreTable[i].score
                });
            }

            this.calculatedGHINEvent.emit(this.calculatedGHINText);
            this.ghinTableEvent.emit(this.scoreTableMarked);
          },
          error => console.error(error)      
      );
  }
}
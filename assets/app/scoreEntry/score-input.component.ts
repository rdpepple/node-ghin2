import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import {IMyDpOptions} from 'mydatepicker';

import { CourseService } from "./course.service";
import { Course } from './course.model';
import { ScoreService } from "./score.service";
import { Score } from './score.model';
import { ErrorService } from "../errors/error.service";


@Component({
  selector: 'app-score-entry-form',
  templateUrl: './score-input.component.html'
})
export class ScoreInputComponent {

  constructor(private scoreService: ScoreService,
              private courseService: CourseService,
              private errorService: ErrorService) {}

  private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy-mm-dd',
        editableDateField: false,
        openSelectorOnInputClick: true
    };

  course: Course;
  score: Score;

  public courses:Array<string> = [];

  getGolfCourseParams(value:any):void {
    console.log('Selected value is: ', value);
  }

  onSubmit(form: NgForm) {
    const course_name = form.value.course;
    // Check if course is not in user's current list
    // Add to DB and courselist in form if not there
    const course = new Course(form.value.course,form.value.slope,form.value.rating);
    this.courseService.addCourse(course)
      .subscribe(
        data => console.log(data),
        error => console.error(error)        
      );

    
    // Add score to db, calculate handicap, update used field(s) in db, 
    // update score table and re-render table component
    
    console.log('Selected course is ', this.course.name);

    const score = new Score(form.value.course, form.value.date_played, form.value.slope, form.value.rating, form.value.score, false);
    this.scoreService.addScore(score)
      .subscribe(
        data => console.log(data),
        error => console.error(error)        
      );
    form.resetForm();
  }

  onClear(form: NgForm) {
    this.score = null;
    form.resetForm();
  }

  ngOnInit() {
    const courses:  String[] = [];
    this.courseService.getCourseNames()
      .subscribe(
        data => {
          this.courses = data;
          if (this.courses.length  === 0) {
            this.courses.push('No courses added to date');
          }
        },
        error => console.error(error)      
      );
  }
}

import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { ErrorService } from '../errors/error.service';

import { Course } from "./course.model";

@Injectable()
export class CourseService {
  private courses: Course[] = [];
  private course: Course;

  constructor(private http: Http, private errorService: ErrorService) {}

  addCourse(course: Course) {
      const body = JSON.stringify(course);
//      console.log('course to add ->' + body);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
      const userid = localStorage.getItem('userId')
        ? '&userid=' + localStorage.getItem('userId')
        : '';  
      const params = token + userid;
      // return this.http.post(`http://34.212.25.164:3000/course/addcourse${params}`, body, {headers: headers})
      return this.http.post(`http://localhost:3000/course/addcourse${params}`, body, {headers: headers})
        .map((response: Response) => {
            const result = response.json();
            const course = new Course(
              result.obj.name,
              result.obj.slope,
              result.obj.rating,
              result.obj.user._id);
            this.courses.push(course);
            return this.courses;  
        })
        .catch((error: Response) => { 
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });
  }

  getCourseNames() {
      var courses: Course[] = [];
      var courseList: string[] = [];
      var token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      const userid = localStorage.getItem('userId')
          ? '&userid=' + localStorage.getItem('userId')
          : '';  
      const params = token + userid;
      // return this.http.get(`http://34.212.25.164:3000/course/coursenames${params}`)
      return this.http.get(`http://localhost:3000/course/coursenames${params}`)
        .map((response: Response) => {
          const courses = response.json().obj;
//          console.log('course names fetched -> ' + JSON.stringify(courses));
          let courseList: Course[] = [];
          for (let course of courses) {
            // courseList.push(course.name);
            courseList.push(new Course(
              course.name,
              course.slope,
	            course.rating,
	            course.user)
            );
          }
          this.courses = courseList;
          return courseList;
        })
        .catch((error: Response) => { 
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });
  }

  getCourseByName(courseName) {
    var token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
    const userid = localStorage.getItem('userId')
        ? '&userid=' + localStorage.getItem('userId')
        : '';
    const params = token + userid + '&coursename=' + courseName;
    // return this.http.get(`http://34.212.25.164:3000/course/course${params}`)
    return this.http.get(`http://localhost:3000/course/course${params}`)
    .map((response: Response) => {
      const course = response.json().obj;
      this.course = course;
      return course;
    })
    .catch((error: Response) => { 
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });
  }
}
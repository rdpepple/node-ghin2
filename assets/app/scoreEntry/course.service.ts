import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { ErrorService } from '../errors/error.service';

import { Course } from "./course.model";

@Injectable()
export class CourseService {
  private courses: Course[] = [];
  private courseList: String[] = [];

  constructor(private http: Http, private errorService: ErrorService) {}

  addCourse(course: Course) {
      const body = JSON.stringify(course);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
      return this.http.post('http://localhost:3000/course' + token, body, {headers: headers})
        .map((response: Response) => {
            const result = response.json();
            const course = new Course(
              result.obj.name,
              result.obj.slope,
              result.obj.rating,
              result.obj._id,
              result.obj.user._id);
            this.courses.push(course);
            return course;  
        })
        .catch((error: Response) => { 
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });
  }

  getCourseNames() {
      var token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      const userid = localStorage.getItem('userId')
          ? '&userid=' + localStorage.getItem('userId')
          : '';   
      const params = token + userid;
      return this.http.get(`http://localhost:3000/courses${params}`)
        .map((response: Response) => {
          const courses = response.json();
          var courseList;
          for (let course of courses) {
            courseList.push(course.name);
          }
          this.courseList = courseList;
          return courseList;
        })
        .catch((error: Response) => { 
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });
  }

  getCourseByName(courseName) {
    const body = JSON.stringify({"courseName": courseName,
                                 "userId": localStorage.getItem('userId')
                               });
    var params = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
    const userid = localStorage.getItem('userId')
        ? '&userid=' + localStorage.getItem('userId')
        : '';
    params = params + userid + ':coursename=' + courseName;
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(`http://localhost:3000/course${params}`)
    .map((response: Response) => response.json())
    .catch((error: Response) => { 
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });
  }
}
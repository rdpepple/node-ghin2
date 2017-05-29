import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { ErrorService } from '../errors/error.service';

import { Score } from "./score.model";

@Injectable()
export class ScoreService {
  private scores: Score[] = [];

  constructor(private http: Http, private errorService: ErrorService) {}

  addScore(score: Score) {
      const body = JSON.stringify(score);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
      return this.http.post('http://localhost:3000/score' + token, body, {headers: headers})
        .map((response: Response) => {
            const result = response.json();
            const course = new Score(
              result.obj.date_played,
              result.obj.course,
              result.obj.slope,
              result.obj.rating,
              result.obj.score,
              result.obj.user._id);
            this.scores.push(score);
            return score;  
        })
        .catch((error: Response) => { 
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });
  }

  getScores() {
      return this.http.get('http://localhost:3000/scores')
        .map((response: Response) => {
          const scores = response.json().obj;
          let userScores: Score[] = [];
          for (let score of scores) {
            userScores.push(new Score(
               score.date_played,
               score.course,
               score.slope,
               score.rating,
               score.score)
            );
          }
          this.scores = userScores;
          return userScores;
        })
        .catch((error: Response) => { 
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });
  }

    updateScoreUsed(score: Score) {   
      const body = JSON.stringify(score);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
      
      return this.http.patch('http://localhost:3000/scoreused' + score.userId + token, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => { 
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });
  }
}
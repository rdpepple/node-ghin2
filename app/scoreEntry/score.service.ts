import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { ErrorService } from '../errors/error.service';

import { Score } from "./score.model";

@Injectable()
export class ScoreService {
  private scores: Score[] = [];
  private score: Score;

  constructor(private http: Http, private errorService: ErrorService) {}

  addScore(score: Score) {
      const body = JSON.stringify(score);
//      console.log('score to add ->' + body);
      const headers = new Headers({'Content-Type': 'application/json'});
      var token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      const userid = localStorage.getItem('userId')
          ? '&userid=' + localStorage.getItem('userId')
          : '';  
      const params = token + userid;
      return this.http.post(`http://34.212.25.164:3000/score/addscore${params}`, body, {headers: headers})
    //   return this.http.post(`http://localhost:3000/score/addscore${params}`, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json())
        });
  }

  getScores() {
      var token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      const userid = localStorage.getItem('userId')
          ? '&userid=' + localStorage.getItem('userId')
          : '';  
      const params = token + userid;
      return this.http.get(`http://34.212.25.164:3000/score/scores${params}`)
    //   return this.http.get(`http://localhost:3000/score/scores${params}`)
        .map((response: Response) => {
          const scores = response.json().obj;
//          console.log('scores fetched -> ' + JSON.stringify(scores));

          let allUserScores: Score[] = [];
          for (let score of scores) {
            allUserScores.push(new Score(
               score.date_played,
               score.course,
               score.slope,
               score.rating,
               score.score)
          )};
          allUserScores.sort(function(a, b){
              var score1=a.date_played.toLowerCase(), score2=b.date_played.toLowerCase()
              if (score1 < score2) //sort string ascending
                  return -1 
              if (score1 > score2)
                  return 1
              return 0 //default return value (no sorting)
        });
        var numUserScores = allUserScores.length;
        var startPos = allUserScores.length-20;
        let userScores: Score[] = [];
        var scorePos;
        for (scorePos= startPos; scorePos < allUserScores.length; scorePos++) {
            userScores.push(allUserScores[scorePos]);
        }
        this.scores = userScores;
        return userScores;
      })
        .catch((error: Response) => { 
          this.errorService.handleError(error.json());
          return Observable.throw(error.json())
        });
  }
}
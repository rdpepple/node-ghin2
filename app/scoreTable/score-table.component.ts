import { Component, Input } from '@angular/core';

import { ScoreMarked } from '../scoreEntry/score-marked.model';

@Component({
  selector: 'app-scores',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent {
    @Input() scoreTableMarked: ScoreMarked[];
    userFirstName = localStorage.getItem('userFirstName');

    getStyleBG(used) {
      if(used){
	      return "green";
	    } else {
	      return "";
	    }
    }

    getStyleColor(used) {
      if(used){
	      return "white";
	    } else {
	      return "";
	    }
    }
}
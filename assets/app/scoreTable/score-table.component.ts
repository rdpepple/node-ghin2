import { Component } from '@angular/core';

@Component({
  selector: 'app-scores',
  templateUrl: `
        <div class="row">
         <div class="col-md-12">
          <h2>Scores for {{ userFirstName }}</h2>
          <br>
          <p>Table goes here...</p>
         </div>
        </div>
    `
})
export class ScoreTableComponent {
    userFirstName = localStorage.getItem('userFirstName');
}
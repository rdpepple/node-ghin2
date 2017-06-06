import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ghin-display',
  templateUrl: `
        <div class="row">
         <div class="col-md-12">
          <h2 id="ghinDisplay_h2">Calculated GHIN for {{userFirstName}}</h2>
          <br>
          <p id="ghinDisplay">{{ghinText}}</p>
         </div>
        </div>
       `,
  styleUrls: ['./ghin-display.component.css']
})
export class GhinDisplayComponent {
  @Input() ghinText: string;
  userFirstName = localStorage.getItem('userFirstName');
}
import { Component} from '@angular/core';

@Component({
  selector: 'app-ghin-display',
  templateUrl: `
        <div class="row">
         <div class="col-md-12">
          <h2>Calculated GHIN for {{userFirstName}}</h2>
          <br>
          <p>Calculated GHIN goes here...</p>
         </div>
        </div>
       `
})
export class GhinDisplayComponent {
  userFirstName = localStorage.getItem('userFirstName');
}
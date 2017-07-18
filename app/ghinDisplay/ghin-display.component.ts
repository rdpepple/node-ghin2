import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ghin-display',
  templateUrl: './ghin-display.component.html',
  styleUrls: ['./ghin-display.component.css']
})
export class GhinDisplayComponent {
  @Input() ghinText: string;
  userFirstName = localStorage.getItem('userFirstName');
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';import { Router } from "@angular/router";
import { MyDatePickerModule } from 'mydatepicker';

import { ScoreInputComponent } from '../scoreEntry/score-input.component';
import { GhinDisplayComponent } from '../ghinDisplay/ghin-display.component';
import { ScoreTableComponent } from '../scoreTable/score-table.component';
import { GhinComponent } from '../ghinMain/ghin.component';
import { CourseService } from '../scoreEntry/course.service';
import { ScoreService } from '../scoreEntry/score.service';
import { LogoutComponent } from '../auth/logout.component';


@NgModule({
  declarations: [
    GhinComponent,
    ScoreInputComponent,
    GhinDisplayComponent,

  ],
  imports: [
      CommonModule,
      FormsModule,
      ScoreTableComponent,
      MyDatePickerModule
  ],
  providers: [CourseService, ScoreService]
})
export class GhinModule {

}
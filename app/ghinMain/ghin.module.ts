import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { MyDatePickerModule } from 'mydatepicker';

import { LogoutModule } from '../logout/logout.module';
import { ScoreInputComponent } from '../scoreEntry/score-input.component';
import { GhinDisplayComponent } from '../ghinDisplay/ghin-display.component';
import { ScoreTableComponent } from '../scoreTable/score-table.component';
import { GhinComponent } from '../ghinMain/ghin.component';
import { courseRouting } from '../scoreEntry/course.routing';
import { scoreRouting } from '../scoreEntry/score.routing';

@NgModule({
  declarations: [
    GhinComponent,
    ScoreInputComponent,
    GhinDisplayComponent,
    ScoreTableComponent
  ],
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MyDatePickerModule,
      LogoutModule,
      courseRouting,
      scoreRouting
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class GhinModule {

}
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoutComponent } from './logout.component';
import { authRouting } from "../auth/auth.routing";

@NgModule({
  declarations: [
    LogoutComponent
  ],
  exports: [
    LogoutComponent
  ],
  imports: [
      CommonModule,
      authRouting
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LogoutModule {
}
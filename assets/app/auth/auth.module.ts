import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LogoutComponent } from './logout.component';
import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';
import { GhinComponent } from '../ghinMain/ghin.component';
import { authRouting } from "./auth.routing";

@NgModule({
  declarations: [
    LogoutComponent,
    SigninComponent,
    SignupComponent,
    GhinComponent
  ],
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      authRouting
  ]
})
export class AuthModule {

}
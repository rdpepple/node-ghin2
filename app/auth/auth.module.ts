import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutModule } from '../logout/logout.module';
import { GhinModule } from '../ghinMain/ghin.module';

import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';
import { authRouting } from "./auth.routing";

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      LogoutModule,
      GhinModule,
      authRouting
  ]
})
export class AuthModule {
}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { LogoutComponent } from './auth/logout.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { GhinComponent } from "./ghinMain/ghin.component";
import { ScoreInputComponent } from './scoreEntry/score-input.component';
import { ScoreTableComponent } from './scoreTable/score-table.component';
import { GhinDisplayComponent } from './ghinDisplay/ghin-display.component';
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { CourseService } from "./scoreEntry/course.service";
import { ScoreService } from './scoreEntry/score.service';
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        GhinComponent,
        ScoreInputComponent,
        ScoreTableComponent,
        GhinDisplayComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        MyDatePickerModule
    ],
    providers: [AuthService, ErrorService, ScoreService, CourseService],
    bootstrap: [AppComponent]
})
export class AppModule {

}

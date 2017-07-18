import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';
import { GhinModule } from './ghinMain/ghin.module';
import { AuthModule } from './auth/auth.module';
import { LogoutModule } from './logout/logout.module';

import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
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
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        MyDatePickerModule,
        GhinModule,
        AuthModule,
        LogoutModule,
        routing
    ],
    providers: [AuthService, ErrorService, ScoreService, CourseService],
    bootstrap: [AppComponent]
})
export class AppModule {

}

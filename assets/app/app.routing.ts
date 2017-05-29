import { LogoutComponent } from './auth/logout.component';
import { Routes, RouterModule } from "@angular/router";

import { AuthenticationComponent } from "./auth/authentication.component";
import { GhinComponent } from "./ghinMain/ghin.component";
import { SigninComponent } from "./auth/signin.component";
import { SignupComponent } from "./auth/signup.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'ghinMain', component: GhinComponent },
    { path: 'auth/ghinMain', component: GhinComponent},
    { path: 'auth/signin', component: SigninComponent},
    { path: 'auth/signup', component: SignupComponent},
    { path: 'auth/logout', component: LogoutComponent },
    { path: 'auth', component: AuthenticationComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
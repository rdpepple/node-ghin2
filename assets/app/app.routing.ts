import { LogoutComponent } from './logout/logout.component';
import { Routes, RouterModule } from "@angular/router";

import { AuthenticationComponent } from "./auth/authentication.component";
import { GhinComponent } from "./ghinMain/ghin.component";
import { SigninComponent } from "./auth/signin.component";
import { SignupComponent } from "./auth/signup.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'ghinMain', component: GhinComponent, loadChildren: './ghinMain/ghin.module#GhinModule' },
    { path: 'auth/signin', component: SigninComponent },
    { path: 'auth/signup', component: SignupComponent },
    { path: 'auth/logout', component: LogoutComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
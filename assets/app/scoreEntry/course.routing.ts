import { Routes, RouterModule } from "@angular/router";

import { GhinComponent } from '../ghinMain/ghin.component';

const COURSE_ROUTES: Routes = [
    { path: 'coursenames', component: GhinComponent },
    { path: 'course', component: GhinComponent },
    { path: 'addcourse', component: GhinComponent }
];

export const courseRouting = RouterModule.forChild(COURSE_ROUTES);
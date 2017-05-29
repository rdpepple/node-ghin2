import { Routes, RouterModule } from "@angular/router";

import { GhinComponent } from '../ghinMain/ghin.component';

const SCORE_ROUTES: Routes = [
    { path: 'scores', component: GhinComponent },
    { path: 'scoreused', component: GhinComponent },
    { path: 'score', component: GhinComponent },
];

export const courseRouting = RouterModule.forChild(SCORE_ROUTES);
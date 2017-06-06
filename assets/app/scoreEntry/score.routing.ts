import { Routes, RouterModule } from "@angular/router";

import { GhinComponent } from '../ghinMain/ghin.component';

const SCORE_ROUTES: Routes = [
    { path: 'scores', component: GhinComponent },
    { path: 'addscore', component: GhinComponent },
];

export const scoreRouting = RouterModule.forChild(SCORE_ROUTES);
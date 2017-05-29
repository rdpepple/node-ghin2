import { Component } from "@angular/core";
import { ScoreInputComponent } from '../scoreEntry/score-input.component';
import { ScoreTableComponent } from '../scoreTable/score-table.component';
import { GhinDisplayComponent } from '../ghinDisplay/ghin-display.component';

@Component({
    selector: 'app-ghin',
    template: `
        <br>
        <div class="row">
            <app-score-entry-form></app-score-entry-form>
        </div>
        <br>
        <div class="row">
            <app-ghin-display></app-ghin-display>
        </div>
        <br>
        <div class="row">
            <app-scores></app-scores>
        </div>
        <hr>
        <div>
            <app-logout></app-logout>
        </div>
    `
})
export class GhinComponent {

}
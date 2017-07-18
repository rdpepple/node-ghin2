import { Component } from "@angular/core";
import { ScoreInputComponent } from '../scoreEntry/score-input.component';
import { ScoreTableComponent } from '../scoreTable/score-table.component';
import { GhinDisplayComponent } from '../ghinDisplay/ghin-display.component';
import { LogoutComponent } from '../logout/logout.component';
import { CourseService} from '../scoreEntry/course.service';
import { ScoreService } from '../scoreEntry/score.service';
import { ScoreMarked } from './../scoreEntry/score-marked.model';

@Component({
    selector: 'app-ghin',
    templateUrl: './ghin.component.html'
})
export class GhinComponent {
    public ghinText: String;
    public scoreTableMarked: ScoreMarked[] = [];

    handleScoresArray(scoreTableMarked: ScoreMarked[]) {
        this.scoreTableMarked = scoreTableMarked;
    }

    handleGHINText(calculatedGHINText: string) {
        this.ghinText = calculatedGHINText;
    }
}
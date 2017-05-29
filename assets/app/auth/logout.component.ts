import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";

@Component({
    selector: 'app-logout',
    template: `
        <div class="col-md-12">
            <button type="button" class="btn btn-primary" (click)="onHomeClick()">Home</button>
            <button class="btn btn-danger" (click)="onLogout()">Logout</button>
        </div>
    `
})
export class LogoutComponent {
    constructor(private authService: AuthService, private router: Router) {}

    onHomeClick() {
      this.router.navigateByUrl('/auth');
    }
    
    onLogout() {
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
    }
}
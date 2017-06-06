import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'ghin-logout',
    templateUrl: './logout.component.html'
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
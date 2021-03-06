import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "./user.model";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
    signinForm;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.signinForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl('', Validators.required)
        });
        this.signinForm.reset();
    }

    onHomeClick() {
      this.router.navigateByUrl('/auth');
    }

    onSubmit(signinUserItem) {
        this.authService.signin(signinUserItem)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('userFirstName', data.userFirstName);
                    localStorage.setItem('userGhin', data.userGhin);
                    this.router.navigateByUrl('/ghinMain');
                },
                error => console.error(error)
            );
        this.signinForm.reset();
   }
}
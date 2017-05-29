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
    myForm;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl('', Validators.required)
        });
    }

    onHomeClick() {
      this.router.navigateByUrl('/auth');
    }

    onSubmit(userItem) {
        this.authService.signin(userItem)
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
        this.myForm.reset();
   }
}
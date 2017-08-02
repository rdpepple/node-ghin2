import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit(signupUserItem) {
        const user = new User(
            signupUserItem.email,
            signupUserItem.password,
            signupUserItem.firstName,
            signupUserItem.lastName,
            signupUserItem.ghin
        );
        this.authService.signup(user)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
                );
        this.signupForm.reset();
        this.router.navigateByUrl('/auth');
    }

    onHomeClick() {
      this.router.navigateByUrl('/auth');
    }

    ngOnInit() {
        this.signupForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            ghin: new FormControl('', Validators.required),
            email: new FormControl('', [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl('', Validators.required)
        });
        this.signupForm.reset();
    }
}
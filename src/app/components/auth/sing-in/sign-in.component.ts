import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ValidateLowercase } from '../../../helpers/validators/lowercase.validator';
import { ValidateNumeric } from '../../../helpers/validators/numeric.validator';
import { ValidateSpecialchar } from '../../../helpers/validators/specialchar.validator';
import { ValidateUppercase } from '../../../helpers/validators/uppercase.validator';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  loginForm: FormGroup | any;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  subs: Subscription[] = [];

  constructor(
    private _authService: AuthService,
    private _firebaseAuth: AngularFireAuth,
    private _toastr: ToastrService,
    private _router: Router,
    private _fb: FormBuilder
  ) {
    this.initLoginForm();
    this.subs.push(
      this._authService.getSwitchLoginMode().subscribe((loginMode) => {
        this.onSwitchMode(loginMode);
      })
    )
  }

  ngOnInit = (): void => {

  }

  initLoginForm = () => {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), ValidateLowercase, ValidateUppercase, ValidateNumeric, ValidateSpecialchar]]
    });
  }



  onSubmit = () => {
    if (!this.loginForm.valid) {
      return;
    }

    this.isLoading = true;

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    let authPromise: Promise<any>;

    if (this.isLoginMode) {
      authPromise = this._authService.login(email, password);
    } else {
      authPromise = this._authService.signup(email, password);
    }

    authPromise
      .then((result) => {
        this._firebaseAuth.authState.subscribe((user) => {
          console.log(user);
          if (user && user.email) {
            this.isLoading = false;
            this._router.navigate(['dashboard']);
            this._authService.handleAuthentication(
              user.email,
              user.uid,
              user.refreshToken
            )
          }
        });
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
        var errorMessage = this._authService.handleError(error.code);
        this._toastr.error(errorMessage);
      });
    this.removeValidators(this.loginForm);
  }

  onSwitchMode = (loginMode: boolean) => {
    this.isLoginMode = loginMode;
    this.loginForm.clear
    this.removeValidators(this.loginForm);
  }

  public removeValidators(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      const control = form.controls[key];
      control.markAsUntouched();
      control.updateValueAndValidity();
    });
  }


  ngOnDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    })
  }

}

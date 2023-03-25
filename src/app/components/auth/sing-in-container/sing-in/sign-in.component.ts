import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map, Subscription, take } from 'rxjs';
import { AuthUser } from 'src/app/models/auth-user.model';
import { LogIn } from 'src/app/store/actions/authenticate.actions';
import { AppState } from 'src/app/store/app.states';
import { selectAppState } from 'src/app/store/selectors/app.selector';
// import { selectAuthUser } from 'src/app/store/selectors/authentication.selector';
import { ValidateLowercase } from '../../../../helpers/validators/lowercase.validator';
import { ValidateNumeric } from '../../../../helpers/validators/numeric.validator';
import { ValidateSpecialchar } from '../../../../helpers/validators/specialchar.validator';
import { ValidateUppercase } from '../../../../helpers/validators/uppercase.validator';
import { AuthService } from '../../auth.service';
import * as fromAuth from '../../../../store/reducers/authenticate.reducer'
import { LoadingService } from 'src/app/helpers/services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {


  @Input() login!: boolean;
  loginForm: FormGroup | any;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  subs: Subscription[] = [];
  // isLoginForm: boolean = true;
  hidePass: boolean = true;
  hidePassConf: boolean = true;
  user: AuthUser = new AuthUser();

  // public authUser$ = this._store.pipe(select(selectAuthUser));

  constructor(
    private _authService: AuthService,
    private _firebaseAuth: AngularFireAuth,
    private _toastr: ToastrService,
    private _router: Router,
    private _fb: FormBuilder,
    private _store: Store<AppState>,
    public _loadingService: LoadingService,
    private _snackBar: MatSnackBar
  ) {
    console.log('login');
    console.log(this.login);

    this.subs.push(
      // this._authService.getSwitchLoginMode().subscribe((loginMode) => {
      //   // this.isLoginForm = loginMode;
      //   this.onSwitchMode(loginMode);
      // }),
      // this._store.select(selectAppState)
      // .pipe(
      //   take(1)
      // )
      // .subscribe
      //   ((state: any) => {
      //     if (state.error.errorCode) {
      //       this.isLoading = false;
      //       // var errorMessage = this._authService.handleError(state.errorMessage.code);
      //       this._toastr.error(state.error.errorMessage, state.error.errorCode);
      //     }
      //   })
    )
  }

  ngOnInit() {
    console.log(this.login);
    this.initForm();
  }

  initForm = () => {
    console.log('init form');
    this.loginForm = this._fb.group({
      // email: ['', [Validators.required, Validators.email, Validators.pattern(
      //   '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      // ),]],
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), ValidateLowercase, ValidateUppercase, ValidateNumeric, ValidateSpecialchar]],
      // passwordconf: ['', [Validators.required]]
      // password: ['', [Validators.required]]
    });
    if (!this.login) {
      console.log('add email');
      this.loginForm.addControl('email', new FormControl('', [Validators.required, Validators.email, Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]));
      this.loginForm.addControl('passwordconf', new FormControl('', [Validators.required]))
    }

  }



  onSubmit = () => {
    console.log(this.loginForm);
    if (!this.loginForm.valid) {
      return;
    }

    
    if (!this.login && this.loginForm.get('password') !== this.loginForm.get('passwordconf')) {
      this._snackBar.open('Password Confirmation is not matching', 'close');
      return;
    }

    this.isLoading = true;

    const username = this.loginForm.value.identifier;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;


    if (this.login) {
      // authPromise = this._authService.login(email, password);
      // this._store.dispatch(invokeAuthAPI({ username: email, password: password }));
      console.log('here');
      const payload = {
        identifier: username,
        password: password
      }
      this._store.dispatch(new LogIn(payload));

    } else {
      // authPromise = this._authService.signup(email, password);
      const payload = {
        username: username,
        email: email,
        password: password
      }
      console.log(payload);
      this._authService.signup(payload).subscribe((register) => {
        console.log(register);
        this.isLoading = false;
      },
        error => {
          console.log(error);
        })
    }
    this.removeValidators(this.loginForm);
  }

  onSwitchMode = (loginMode: boolean) => {
    this.isLoginMode = loginMode;
    this.loginForm.clear;
    this.removeValidators(this.loginForm);
    // this.initForm();
    console.log(this.isLoginMode);

  }

  public removeValidators(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      const control = form.controls[key];
      control.markAsUntouched();
      control.updateValueAndValidity();
    });
  }

  forgotPassword() {
    this._router.navigate(['auth/forgot-password'],);
  }

  ngOnDestroy() {
    console.log('on destroy');
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    })
  }

}

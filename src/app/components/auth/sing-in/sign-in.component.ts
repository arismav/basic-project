import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map, Subscription } from 'rxjs';
import { AuthUser } from 'src/app/models/auth-user.model';
import { LogIn } from 'src/app/store/actions/authenticate.actions';
import { authFetchAPISuccess, invokeAuthAPI } from 'src/app/store/actions/authentication.actions';
import { AppState } from 'src/app/store/app.states';
import { selectAppState } from 'src/app/store/selectors/app.selector';
import { selectAuthUser } from 'src/app/store/selectors/authentication.selector';
import { ValidateLowercase } from '../../../helpers/validators/lowercase.validator';
import { ValidateNumeric } from '../../../helpers/validators/numeric.validator';
import { ValidateSpecialchar } from '../../../helpers/validators/specialchar.validator';
import { ValidateUppercase } from '../../../helpers/validators/uppercase.validator';
import { AuthService } from '../auth.service';
import * as fromAuth from '../../../store/reducers/authenticate.reducer'

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

  user: AuthUser = new AuthUser();

  public authUser$ = this._store.pipe(select(selectAuthUser));

  constructor(
    private _authService: AuthService,
    private _firebaseAuth: AngularFireAuth,
    private _toastr: ToastrService,
    private _router: Router,
    private _fb: FormBuilder,
    private _store: Store<AppState>
  ) {
    console.log('login 1')
    this.initLoginForm();
    this.subs.push(
      this._authService.getSwitchLoginMode().subscribe((loginMode) => {
        this.onSwitchMode(loginMode);
      }),
      this._store.select(selectAppState).subscribe
      ((state: any) => {
        console.log(state);
        if (state.errorMessage) {
          this.isLoading = false;
          var errorMessage = this._authService.handleError(state.errorMessage.code);
          this._toastr.error(errorMessage);
        }
        // return user;
      })
    )


    

  }

  ngOnInit() {
    console.log('login')



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
      // authPromise = this._authService.login(email, password);
      // this._store.dispatch(invokeAuthAPI({ username: email, password: password }));
      console.log('here');
      this._store.dispatch(new LogIn({ email, password }));

    } else {
      authPromise = this._authService.signup(email, password);
    }

    // this.authUser$.subscribe((user) => {
    //   console.log(user);
    //   if (user && user.email) {
    //     this.isLoading = false;
    //     this._router.navigate(['dashboard']);
    //     // this._authService.handleAuthentication(
    //     //   user.email,
    //     //   user.uid,
    //     //   user.refreshToken
    //     // )
    //   }else {
    //     console.log(user);
    //     this.isLoading = false;
    //     // var errorMessage = this._authService.handleError(error.code);
    //     // this._toastr.error(errorMessage);
    //   }
    // },
    //   (error) => {
    //     console.log(error);
    //     this.isLoading = false;
    //     var errorMessage = this._authService.handleError(error.code);
    //     this._toastr.error(errorMessage);
    //   })

    // authPromise
    //   .then((result) => {
    //     console.log(result);
    //     this._firebaseAuth.authState.subscribe((user) => {
    //       console.log(user);
    //       if (user && user.email) {
    //         this.isLoading = false;
    //         this._router.navigate(['dashboard']);
    //         this._authService.handleAuthentication(
    //           user.email,
    //           user.uid,
    //           user.refreshToken
    //         )
    //       }
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     this.isLoading = false;
    //     var errorMessage = this._authService.handleError(error.code);
    //     this._toastr.error(errorMessage);
    //   });
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

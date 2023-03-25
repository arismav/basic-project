import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/helpers/services/loader.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup | any;

  constructor(
    private _fb: FormBuilder,
    public _loadingService: LoadingService,
    private _router: Router,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.forgotPasswordForm = this._fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]]
    });
  }

  backToSignIn() {
    this._router.navigate(['/auth']);
  }

  onSubmit() {
    console.log(this.forgotPasswordForm.value);
    const payload = {
      email: this.forgotPasswordForm.value.email
    }
    this._authService.forgotPassword(payload).subscribe((res)=> {
      console.log(res);
    })
  }
}

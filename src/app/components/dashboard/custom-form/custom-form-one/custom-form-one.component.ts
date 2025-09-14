import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { initialState } from 'src/app/store/reducers/authenticate.reducer';
import { DashboardService } from '../../dashboard.service';
import { BehaviorSubject, map, Observable, of, take } from 'rxjs';

@Component({
  selector: 'app-custom-form-one',
  templateUrl: './custom-form-one.component.html',
  styleUrls: ['./custom-form-one.component.scss']
})
export class CustomFormOneComponent implements OnInit {

  userProfileForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dashboardService: DashboardService
  ) {
    console.log('FORM 1')
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    console.log('init form');
    this._dashboardService.getCustomFormOne()
      .pipe(
        take(1)
      )
      .subscribe((formOne) => {
        console.log(formOne);
        if (formOne) {
          this.userProfileForm = formOne;
        } else {
          this.userProfileForm = this._fb.group({
            username: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]]
          });
        }
        this._dashboardService.setCustomFormOne(this.userProfileForm);
      })



  }

  get username() {
    return this.userProfileForm.get('username');
  }

  getRequiredValidator(formControlName: string) {
    return (this.userProfileForm.get(`${formControlName}`)?.invalid) && (this.userProfileForm.get(`${formControlName}`)?.dirty || this.userProfileForm.get(`${formControlName}`)?.touched) && (this.userProfileForm.get(`${formControlName}`)?.errors?.['required']);
  }

  onSubmit() {

  }



}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../dashboard.service';
import { BehaviorSubject, map, Observable, of, take } from 'rxjs';

@Component({
  selector: 'app-custom-form-two',
  templateUrl: './custom-form-two.component.html',
  styleUrls: ['./custom-form-two.component.scss']
})
export class CustomFormTwoComponent implements OnInit {

 
  userJobForm: FormGroup | any;

  constructor(
    private _fb: FormBuilder,
    private _dashboardService: DashboardService
  ) { 
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this._dashboardService.getCustomFormTwo()
      .pipe(
        take(1)
      )
      .subscribe((formTwo) => {
        if (formTwo) {
         this.userJobForm = formTwo;
        } else {
          this.userJobForm = this._fb.group({
            job: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]]
          });
        }
        this._dashboardService.setCustomFormTwo(this.userJobForm);
      })
  }

  get job() {
    return this.userJobForm.get('job');
  }

  getRequiredValidator(formControlName:string){
    return (this.userJobForm.get(`${formControlName}`)?.invalid) && (this.userJobForm.get(`${formControlName}`)?.dirty || this.userJobForm.get(`${formControlName}`)?.touched) && (this.userJobForm.get(`${formControlName}`)?.errors?.required);
  }

  onSubmit() {

  }

}

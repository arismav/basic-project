import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomForms } from 'src/app/models/custom-form.model';
import { DummyUser } from 'src/app/models/user.model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
  animations: [
    trigger("inOutPaneAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(-100%)" }),
        style({ opacity: 0, transform: "translateX(-50%)" }), //apply default styles before animation starts
        animate(
          "250ms {{delay}}ms ease-in-out",
          style({ opacity: 1, transform: "translateX(0)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "translateX(0)" }), //apply default styles before animation starts
        animate(
          '0ms ease-in-out',
          style({ opacity: 0, transform: "translateX(-100%)" })
        )
      ])
    ])
  ]
})
export class CustomFormComponent implements OnInit {

  // customForms = {
  //   FORM_ONE: 'FORM_ONE',
  //   FORM_TWO: 'FORM_TWO',
  // };
  
 
  
  // activeForm = this.customForms.FORM_ONE;
  loaded1 = false;
  loaded2 = false;
  isLinear = false;

  public customForms = CustomForms;
  public delay: number = 750;
  formSteps = [
    { label: 'Step 1', key: this.customForms.FORM_ONE },
    { label: 'Step 2', key: this.customForms.FORM_TWO },
  ];

  public activeForm = this.customForms.FORM_ONE;
  public formOne!: FormGroup;
  public formTwo!: FormGroup;
  public filteredDummyUsers = <any>[];
  public subs: Subscription[] = [];

  @ViewChild('userInp') userInp: ElementRef = new ElementRef(null);

  // public DUMMY_USERS = [
  //   {
  //     name: "Aris",
  //     surname: "Mavroudis"
  //   },
  //   {
  //     name: "Panos",
  //     surname: "Geo"
  //   }
  // ];

  // public filterUser: string = '';

  constructor(
    private _dashboardService: DashboardService,
    private _ch: ChangeDetectorRef
  ) {

    // this.filteredDummyUsers = this.DUMMY_USERS;
    this.subs.push(
      this._dashboardService.getCustomFormOne().subscribe((formOne) => {
        console.log(formOne)
        this.formOne = formOne;
        this.loaded1 = true;
      }),
      this._dashboardService.getCustomFormTwo().subscribe((formTwo) => {
        console.log(formTwo)
        
        this.formTwo = formTwo;
        this.loaded2 = true;
      })
    )
    // this._ch.detectChanges();

  }

  ngOnInit(): void {
    // this._ch.detectChanges();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  // filterUsers() {
  //   console.log('here');
  //   this.filteredDummyUsers = this.DUMMY_USERS.filter(user => (user.name.includes(this.filterUser) || user.surname.includes(this.filterUser)));
  // }

  checkFormValidity() {
    if (this.activeForm === this.customForms.FORM_ONE && this.formOne) {
      return !this.formOne.valid;
    }
    else if (this.activeForm === this.customForms.FORM_TWO && this.formTwo) {
      return !this.formTwo.valid;
    }
    else {
      return true;
    }
  }

  onClickNext() {
    if (this.activeForm === this.customForms.FORM_ONE) {
      this.activeForm = this.customForms.FORM_TWO
    }
  }

  onClickBack() {
    if (this.activeForm === this.customForms.FORM_TWO) {
      this.activeForm = this.customForms.FORM_ONE
    }
  }

  stepChecker(first: boolean) {
    switch (this.activeForm) {
      case this.customForms.FORM_ONE: {
        return first ? true : false;
        break;
      }
      case this.customForms.FORM_TWO: {
        return first ? false : true;
        break;
      }
      default: {
        return;
        break;
      }
    }
  }


  onSubmit() {
    const payload = {
      username: this.formOne?.get('username')?.value,
      job: this.formTwo?.get('job')?.value
    }

    console.log(payload);
  }

  isStepCompleted(stepKey: any): boolean {
    const stepOrder = this.formSteps.map(s => s.key);
    return stepOrder.indexOf(stepKey) < stepOrder.indexOf(this.activeForm);
  }

  goToStep(stepKey: any) {
    this.activeForm = stepKey;
  }

  // addUser = () => {
  //   console.log(this.userInp.nativeElement.value);
  //   const userVal = this.userInp.nativeElement.value;
  //   const newUser = new DummyUser(this.userInp.nativeElement.value, '');
  //   this.DUMMY_USERS = [...this.DUMMY_USERS, newUser];
  // }

  // globalClick = () => {
  //   console.log('global click');
  // }

}

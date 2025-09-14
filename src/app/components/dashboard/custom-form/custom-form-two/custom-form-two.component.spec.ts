import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormTwoComponent } from './custom-form-two.component';

describe('CustomFormTwoComponent', () => {
  let component: CustomFormTwoComponent;
  let fixture: ComponentFixture<CustomFormTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFormTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

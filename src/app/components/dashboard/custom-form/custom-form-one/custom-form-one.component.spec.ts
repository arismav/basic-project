import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormOneComponent } from './custom-form-one.component';

describe('CustomFormOneComponent', () => {
  let component: CustomFormOneComponent;
  let fixture: ComponentFixture<CustomFormOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFormOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

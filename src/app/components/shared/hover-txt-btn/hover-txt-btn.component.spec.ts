import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverTxtBtnComponent } from './hover-txt-btn.component';

describe('HoverTxtBtnComponent', () => {
  let component: HoverTxtBtnComponent;
  let fixture: ComponentFixture<HoverTxtBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoverTxtBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoverTxtBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

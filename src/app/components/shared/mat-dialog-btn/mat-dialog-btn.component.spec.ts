import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogBtnComponent } from './mat-dialog-btn.component';

describe('MatDialogBtnComponent', () => {
  let component: MatDialogBtnComponent;
  let fixture: ComponentFixture<MatDialogBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatDialogBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatDialogBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingInContainerComponent } from './sing-in-container.component';

describe('SingInContainerComponent', () => {
  let component: SingInContainerComponent;
  let fixture: ComponentFixture<SingInContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingInContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingInContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

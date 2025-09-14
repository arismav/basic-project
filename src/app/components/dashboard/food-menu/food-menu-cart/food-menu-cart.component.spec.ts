import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodMenuCartComponent } from './food-menu-cart.component';

describe('FoodMenuCartComponent', () => {
  let component: FoodMenuCartComponent;
  let fixture: ComponentFixture<FoodMenuCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodMenuCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodMenuCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

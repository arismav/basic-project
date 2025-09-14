import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodMenuItemComponent } from './food-menu-item.component';

describe('FoodMenuItemComponent', () => {
  let component: FoodMenuItemComponent;
  let fixture: ComponentFixture<FoodMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodMenuItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

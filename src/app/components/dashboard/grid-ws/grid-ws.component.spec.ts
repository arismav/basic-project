import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridWsComponent } from './grid-ws.component';

describe('GridWsComponent', () => {
  let component: GridWsComponent;
  let fixture: ComponentFixture<GridWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridWsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableViewComponent } from './data-table-view.component';

describe('DataTableViewComponent', () => {
  let component: DataTableViewComponent;
  let fixture: ComponentFixture<DataTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

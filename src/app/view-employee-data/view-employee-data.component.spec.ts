import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeeDataComponent } from './view-employee-data.component';

describe('ViewEmployeeDataComponent', () => {
  let component: ViewEmployeeDataComponent;
  let fixture: ComponentFixture<ViewEmployeeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmployeeDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmployeeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

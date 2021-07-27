import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoPopupComponent } from './personal-info-popup.component';

describe('PersonalInfoPopupComponent', () => {
  let component: PersonalInfoPopupComponent;
  let fixture: ComponentFixture<PersonalInfoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInfoPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

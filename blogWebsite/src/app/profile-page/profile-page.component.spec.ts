import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePAgeComponent } from './profile-page.component';

describe('ProfilePAgeComponent', () => {
  let component: ProfilePAgeComponent;
  let fixture: ComponentFixture<ProfilePAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

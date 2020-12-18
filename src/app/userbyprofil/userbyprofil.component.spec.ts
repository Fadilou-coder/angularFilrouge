import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbyprofilComponent } from './userbyprofil.component';

describe('UserbyprofilComponent', () => {
  let component: UserbyprofilComponent;
  let fixture: ComponentFixture<UserbyprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserbyprofilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserbyprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

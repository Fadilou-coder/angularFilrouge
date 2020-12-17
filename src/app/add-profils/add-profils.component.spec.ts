import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfilsComponent } from './add-profils.component';

describe('AddProfilsComponent', () => {
  let component: AddProfilsComponent;
  let fixture: ComponentFixture<AddProfilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProfilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesPageComponent } from './courses-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesPageComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

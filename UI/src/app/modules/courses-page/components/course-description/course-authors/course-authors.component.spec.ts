import { CourseAuthorsComponent } from './course-authors.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

describe('CourseAuthorsComponent', () => {
    let component: CourseAuthorsComponent;
    let fixture: ComponentFixture<CourseAuthorsComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
            CourseAuthorsComponent,
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CourseAuthorsComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
});

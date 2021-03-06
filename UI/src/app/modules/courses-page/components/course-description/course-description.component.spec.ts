import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/modules/courses-page/services/courses.service';
import { CoursesDescriptionComponent } from './course-description.component';
import { BrowserModule } from '@angular/platform-browser';
import { Course } from '../../models/course';
import { DatePipe } from '@angular/common';
import { CoursesServiceStub } from 'src/app/modules/shared/testing-stub/courses-service-stub.mock';
import { RouterStub } from 'src/app/modules/shared/testing-stub/router-stub.mock';
import { subscribeOn } from 'rxjs/operators';

class ActivatedRouteStub {
  public snapshot: object = {
    url : [{path : 3}]
  };
  constuctor (): void {}
}

const routerStub = new RouterStub();
const course = new Course(3, 'duis mollit reprehenderit ad', '2020-01-28T04:39:24+00:00', 67, 'reprehenderit est veniam elit', true);
const datePipe = new DatePipe('en-US');
const formBuilder = new FormBuilder();
const coursesServiceStub = new CoursesServiceStub();

describe('CoursesDescriptionComponent', () => {
    let component: CoursesDescriptionComponent;
    let fixture: ComponentFixture<CoursesDescriptionComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CoursesDescriptionComponent,
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ],
        imports: [
          FormsModule,
          ReactiveFormsModule,
          BrowserModule
        ],
        providers: [
          { provide: FormBuilder, useValue: formBuilder },
          { provide: DatePipe, useValue: datePipe },
          { provide: ModalService, useValue: {} },
          { provide: Router, useValue: routerStub },
          { provide: ActivatedRoute, useValue: new ActivatedRouteStub() },
          { provide: CoursesService, useValue: coursesServiceStub },
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CoursesDescriptionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    afterEach(() => {
      fixture.destroy();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set course descripton in OnInit()', () => {
      component.course = course;
      component.ngOnInit();
      const courseDescription = formBuilder.group({
        title: [course.title, Validators.required],
        description: [course.description, Validators.required],
        date: [datePipe.transform(course.creationDate, 'dd/MM/yyyy'), Validators.required],
        duration: [course.duration, Validators.required],
        isTopRated: [course.isTopRated]
      });
      expect(component.courseDescription.value).toEqual(courseDescription.value);
      expect(component.courseDescription.status).toEqual(courseDescription.status);
    });

    it('should navigate by url \'/courses\' in goBack()', () => {
      component.goBack();
      expect(routerStub.navigateByUrl).toHaveBeenCalledWith('/courses');
    });
});

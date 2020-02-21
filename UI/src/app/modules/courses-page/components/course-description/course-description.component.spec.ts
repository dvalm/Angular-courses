import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/modules/shared/services/courses.service';
import { CoursesDescriptionComponent } from './course-description.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';

const CoursesServiceStub = {};

const ActivatedRouteStub = {};

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
          RouterTestingModule,
        ],
        providers: [
          FormBuilder,
          { provide: DatePipe, useValue: {} },
          { provide: ModalService, useValue: {} },
          { provide: ActivatedRoute, useValue: ActivatedRouteStub },
          { provide: CoursesService, useValue: CoursesServiceStub },
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CoursesDescriptionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
});

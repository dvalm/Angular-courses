import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CoursesPageRoutingModule } from 'src/app/modules/courses-page/courses-page.routing';
import { CoursesPageComponent } from 'src/app/modules/courses-page/courses-page.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesDescriptionComponent } from 'src/app/modules/courses-page/components/course-description/course-description.component';
import { CourseControlPanelComponent } from 'src/app/modules/courses-page/components/course-control-panel/course-control-panel.component';
import { CourseListComponent } from 'src/app/modules/courses-page/components/course-list/course-list.component';
import { CourseComponent } from 'src/app/modules/courses-page/components/course-list/course/course.component';
import { CourseDateComponent } from 'src/app/modules/courses-page/components/course-description/course-date/course-date.component';
import {
  CourseDurationComponent
} from 'src/app/modules/courses-page/components/course-description/course-duration/course-duration.component';
import { CoursePlateBorderDirective } from 'src/app/modules/courses-page/directives/course-plate-border.directive';
import { HourglassDirective } from 'src/app/modules/courses-page/directives/hourglass.directive';
import { DurationPipe } from 'src/app/modules/courses-page/pipes/duration.pipe';
import { CoursesOrderByPipe } from 'src/app/modules/courses-page/pipes/courses-order-by.pipe';
import { SearchCoursesPipe } from 'src/app/modules/courses-page/pipes/search-courses.pipe';
import { CoursesService } from 'src/app/modules/courses-page/services/courses.service';

const declarations = [
  CoursesPageComponent,
  CourseControlPanelComponent,
  CourseComponent,
  CourseListComponent,
  CoursesDescriptionComponent,
  CourseDateComponent,
  CourseDurationComponent,
  CoursePlateBorderDirective,
  HourglassDirective,
  DurationPipe,
  CoursesOrderByPipe,
  SearchCoursesPipe
];

const providers = [
  CoursesOrderByPipe,
  SearchCoursesPipe,
  DecimalPipe,
  CoursesService
];

@NgModule({
  declarations: [ ...declarations ],
    imports: [
        CommonModule,
        CoursesPageRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
  providers: [ ...providers ],
  exports: [ ...declarations ]
})
export class CoursesPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageRoutingModule } from 'src/app/modules/courses-page/courses-page.routing';
import { CoursesPageComponent } from 'src/app/modules/courses-page/courses-page.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CourseControlPanelComponent } from 'src/app/modules/courses-page/components/course-control-panel/course-control-panel.component';
import { CourseListComponent } from 'src/app/modules/courses-page/components/course-list/course-List.component';
import { CourseComponent } from 'src/app/modules/courses-page/components/course-list/course/course.component';
import { CoursePlateBorderDirective } from 'src/app/modules/courses-page/directives/course-plate-border.directive';
import { HourglassDirective } from 'src/app/modules/courses-page/directives/hourglass.directive';
import { HoursAndMinutesPipe } from 'src/app/modules/courses-page/pipes/hours-and-minutes.pipe';
import { OrderCourseByDatePipe } from 'src/app/modules/courses-page/pipes/order-course-by-date.pipe';
import { SearchCoursesPipe }  from 'src/app/modules/courses-page/pipes/search-courses.pipe';

const declarations = [
  CoursesPageComponent,
  CourseControlPanelComponent,
  CourseListComponent,
  CourseComponent,
  CoursePlateBorderDirective,
  HourglassDirective,
  HoursAndMinutesPipe,
  OrderCourseByDatePipe,
  SearchCoursesPipe
];

@NgModule({
  declarations: [ ...declarations ],
    imports: [
        CommonModule,
        CoursesPageRoutingModule,
        HttpClientModule,
        FormsModule,
        SharedModule,
    ],
  exports: [ ...declarations ]
})
export class CoursesPageModule { }
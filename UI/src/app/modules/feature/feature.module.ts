import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from 'src/app/modules/feature/feature.routing';
import { TodoComponent } from 'src/app/modules/feature/components/todo/todo.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CourseControlPanelComponent } from 'src/app/modules/feature/components/todo/courseControlPanel/course-control-panel.component';
import { CourseListComponent } from 'src/app/modules/feature/components/todo/courseList/course-List.component';
import { CourseComponent } from 'src/app/modules/feature/components/todo/courseList/course/course.component';

const declarations = [
  TodoComponent,
  CourseControlPanelComponent,
  CourseListComponent,
  CourseComponent
];

@NgModule({
  declarations: [ ...declarations ],
    imports: [
        CommonModule,
        FeatureRoutingModule,
        HttpClientModule,
        FormsModule,
        SharedModule,
    ],
  exports: [ ...declarations ]
})
export class FeatureModule { }

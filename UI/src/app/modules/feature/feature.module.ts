import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from 'src/app/modules/feature/feature.routing';
import { TodoComponent } from 'src/app/modules/feature/components/todo/todo.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CoursesSectionComponent } from 'src/app/modules/feature/components/todo/coursesSection/coursesSection.component';
import { CoursesListComponent } from 'src/app/modules/feature/components/todo/coursesList/coursesList.component';
import { CoursesListItemComponent } from 'src/app/modules/feature/components/todo/coursesList/coursesListItem/coursesListItem.component';

const declarations = [
  TodoComponent,
  CoursesSectionComponent,
  CoursesListComponent,
  CoursesListItemComponent
];

@NgModule({
  declarations: declarations,
    imports: [
        CommonModule,
        FeatureRoutingModule,
        HttpClientModule,
        SharedModule,
    ],
  exports: declarations
})
export class FeatureModule { }

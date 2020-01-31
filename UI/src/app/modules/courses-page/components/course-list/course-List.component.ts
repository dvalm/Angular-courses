import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Course } from "src/app/modules/courses-page/models/course"
import { CoursesOrderByPipe } from "src/app/modules/courses-page/pipes/courses-order-by.pipe"
import { SearchCoursesPipe } from "src/app/modules/courses-page/pipes/search-courses.pipe"
import { CoursesService } from '../../services/courses.service';
import { DeleteCourseModalDialogService } from 'src/app/modules/shared/services/delete-course-modal-dialog.service';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-List.component.html',
    styleUrls: ['./course-List.component.scss']
  })
  export class CourseListComponent implements OnInit, OnChanges{

    @Input() searchText: string;
    private courses: Course[] = [];
    public sortedCourses: Course[] = [];

    constructor(private orderByPipe: CoursesOrderByPipe,
                private searchCourse: SearchCoursesPipe,
                private coursesService: CoursesService,
                private deleteCourseModalDialogService: DeleteCourseModalDialogService){}

    public ngOnInit(): void{
      this.courses = this.coursesService.courses;
      this.sortedCourses = this.orderByPipe.transform(this.courses, 'creationDate');
    }

    public ngOnChanges(_changes: SimpleChanges): void {
      this.updateCourseVisability();
    }

    public onDelete(course: Course): void {
      this.deleteCourseModalDialogService.open();
      this.deleteCourseModalDialogService.addDeleteCourse(this, course);
    }

    public loadMore(): void {
      console.log("loadMore");
    }
    
    public updateCourseVisability(): void {
      this.sortedCourses = this.orderByPipe.transform(this.courses, 'creationDate');
      this.sortedCourses = this.searchCourse.transform(this.sortedCourses, this.searchText);
    }
  }
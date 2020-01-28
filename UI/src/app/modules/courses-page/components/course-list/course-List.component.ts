import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Course } from "src/app/modules/courses-page/models/course"
import { CoursesOrderBy } from "src/app/modules/courses-page/pipes/courses-order-by.pipe"
import { SearchCoursesPipe } from "src/app/modules/courses-page/pipes/search-courses.pipe"
import { CoursesService } from '../../services/courses.service';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-List.component.html',
    styleUrls: ['./course-List.component.scss']
  })
  export class CourseListComponent implements OnInit, OnChanges{

    @Input() searchText: string;
    private courses: Course[] = [];
    public sortedCourses: Course[] = [];

    constructor(private orderByPipe: CoursesOrderBy,
                private searchCourse: SearchCoursesPipe,
                private coursesService: CoursesService){}

    public ngOnInit(): void{
      this.courses = this.coursesService.courses;
      this.sortedCourses = this.orderByPipe.transform(this.courses, 'creationDate');
      //this.coursesService.createCourse(new Course(5, 'el.name', '2017-06-06T00:07:32+00:00', 121, 'el.description', true));
      //let a = this.coursesService.getCourseById(4282);
      //this.coursesService.updateCourse(a, new Course(5, 'el.name2', '2017-06-06T00:07:32+00:00', 181, 'el.description2', false));
    }

    public ngOnChanges(changes: SimpleChanges): void {
      this.sortedCourses = this.orderByPipe.transform(this.courses, 'creationDate');
      this.sortedCourses = this.searchCourse.transform(this.sortedCourses, this.searchText);
    }

    public onDelete(course: Course): void {
      if(confirm("Delete this course?")){
        this.coursesService.removeCourse(course);
        this.courses = this.coursesService.courses;
        this.sortedCourses = this.orderByPipe.transform(this.courses, 'creationDate');
        this.sortedCourses = this.searchCourse.transform(this.sortedCourses, this.searchText);  
      }
    }

    public loadMore(): void {
      console.log("loadMore");
    }
  }
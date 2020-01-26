import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import data from "src/app/modules/courses-page/models/courses.json";
import { Course } from "src/app/modules/courses-page/models/course"
import { OrderCourseByDatePipe } from "src/app/modules/courses-page/pipes/order-course-by-date.pipe"
import { SearchCoursesPipe } from "src/app/modules/courses-page/pipes/search-courses.pipe"

@Component({
    selector: 'app-course-list',
    templateUrl: './course-List.component.html',
    styleUrls: ['./course-List.component.scss']
  })
  export class CourseListComponent implements OnInit, OnChanges{

    @Input() searchText: string;
    private courses: Course[] = [];
    public sortedCourses: Course[] = [];

    constructor(private orderByPipe: OrderCourseByDatePipe,
                private searchCourse: SearchCoursesPipe){}

    public ngOnInit(): void{
      data.courses.slice(0, 6).forEach( el => {
        this.courses.push(new Course(el.id, el.name, el.date, el.length, el.description, el.isTopRated))
      })
      this.sortedCourses = this.orderByPipe.transform(this.courses);
      console.log("OnInit");
    }

    public ngOnChanges(changes: SimpleChanges): void {
      this.sortedCourses = this.orderByPipe.transform(this.courses);
      this.sortedCourses = this.searchCourse.transform(this.sortedCourses, this.searchText);
      console.log("OnChanges");
      console.log(changes);
    }

    public onDelete(): void {
      console.log("onDelete");
    }

    public loadMore(): void {
      console.log("loadMore");
    }
  }
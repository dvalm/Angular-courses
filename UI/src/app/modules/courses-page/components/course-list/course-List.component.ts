import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import data from "src/app/modules/courses-page/models/courses.json";
import { Course } from "src/app/modules/courses-page/models/course"

@Component({
    selector: 'app-course-list',
    templateUrl: './course-List.component.html',
    styleUrls: ['./course-List.component.scss']
  })
  export class CourseListComponent implements OnInit, OnChanges{

    public courses: Course[] = [];

    public ngOnInit(): void{
      data.courses.slice(0, 6).forEach( el => {
        this.courses.push(new Course(el.id, el.name, el.date, el.length, el.description, el.isTopRated))
      })
      console.log("OnInit");
      console.log(this.courses.length);
    }

    public ngOnChanges(changes: SimpleChanges): void {
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
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import data from "../../../models/courses.json";

@Component({
    selector: 'app-course-list',
    templateUrl: './course-List.component.html',
    styleUrls: ['./course-List.component.scss']
  })
  export class CourseListComponent implements OnInit, OnChanges{

    public courses: any;
    public items: Array<number> = [0, 1, 2, 3, 4, 5];

    constructor(){
      this.courses = data.courses;
    }

    public ngOnInit(): void{
      console.log("OnInit");
    }

    public ngOnChanges(changes: SimpleChanges): void {
      console.log("OnChanges");
      console.log("changes");
    }

    public onClickDelete(): void {
      console.log("onClickDelete");
    }
  }
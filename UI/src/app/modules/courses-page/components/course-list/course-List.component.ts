import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';
import { CoursesOrderByPipe } from 'src/app/modules/courses-page/pipes/courses-order-by.pipe';
import { SearchCoursesPipe } from 'src/app/modules/courses-page/pipes/search-courses.pipe';
import { CoursesService } from '../../services/courses.service';
import { ModalService } from 'src/app/modules/shared/services/madal.service';
import {
  DeleteCourseModalDialogComponent
} from 'src/app/modules/shared/components/delete-course-modal-dialog/delete-course-modal-dialog.component';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss']
  })
  export class CourseListComponent implements OnInit, OnChanges {

    @Output() changePage:  EventEmitter<any> = new EventEmitter();

    private searchText: string;
    private courses: Course[] = [];
    public sortedCourses: Course[] = [];

    constructor(private orderByPipe: CoursesOrderByPipe,
                private searchCourse: SearchCoursesPipe,
                private coursesService: CoursesService,
                private modalService: ModalService) {}

    public ngOnInit(): void {
      this.courses = this.coursesService.courses;
      this.sortedCourses = this.orderByPipe.transform(this.courses, 'creationDate');
    }

    public ngOnChanges(_changes: SimpleChanges): void {
      this.updateCourseVisability();
    }

    public changeSearchText(searchText: string): void {
      this.searchText = searchText;
      this.updateCourseVisability();
    }

    public onDelete(course: Course): void {
      const modalRef = this.modalService.openModal(DeleteCourseModalDialogComponent);
      modalRef.instance.userAction.subscribe( (isDelete: boolean) => {
        if (isDelete) {
          this.coursesService.removeCourse(course);
          this.courses = this.coursesService.courses;
          this.updateCourseVisability();
        }
        this.modalService.closeModel(modalRef);
      });
    }

    public loadMore(): void {
      console.log('loadMore');
    }

    public updateCourseVisability(): void {
      this.sortedCourses = this.orderByPipe.transform(this.courses, 'creationDate');
      this.sortedCourses = this.searchCourse.transform(this.sortedCourses, this.searchText);
    }

    public openDescriptionCourse(): void {
      this.changePage.emit(true);
    }
  }

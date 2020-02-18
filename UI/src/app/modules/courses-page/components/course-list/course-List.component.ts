import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';
import { CoursesOrderByPipe } from 'src/app/modules/courses-page/pipes/courses-order-by.pipe';
import { SearchCoursesPipe } from 'src/app/modules/courses-page/pipes/search-courses.pipe';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import {
  ConfirmationDeleteModalComponent
} from 'src/app/modules/shared/components/confirmation-delete-modal/confirmation-delete-modal.component';
import { CoursesService } from 'src/app/modules/shared/services/courses.service';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CourseListComponent implements OnInit, OnChanges {

    private searchText: string;
    private courses: Course[] = [];
    public sortedCourses: Course[] = [];

    constructor(private orderByPipe: CoursesOrderByPipe,
                private searchCourse: SearchCoursesPipe,
                private coursesService: CoursesService,
                private modalService: ModalService,
                private changeDetectorRef: ChangeDetectorRef) {}

    public ngOnInit(): void {
      this.courses = this.coursesService.getAllCourses();
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
      const modalRef = this.modalService.openModal(ConfirmationDeleteModalComponent);
      modalRef.instance.userAction.subscribe( (isDelete: boolean) => {
        if (isDelete) {
          this.coursesService.removeCourse(course);
          this.courses = this.coursesService.getAllCourses();
          this.updateCourseVisability();
          this.changeDetectorRef.detectChanges();
        }
        this.modalService.closeModel(modalRef);
      });
    }

    public loadMore(): void {}

    public updateCourseVisability(): void {
      this.sortedCourses = this.orderByPipe.transform(this.courses, 'creationDate');
      this.sortedCourses = this.searchCourse.transform(this.sortedCourses, this.searchText);
    }
  }

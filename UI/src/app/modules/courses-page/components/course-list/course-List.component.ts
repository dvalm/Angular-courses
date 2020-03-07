import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';
import { CoursesOrderByPipe } from 'src/app/modules/courses-page/pipes/courses-order-by.pipe';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import {
  ConfirmationDeleteModalComponent
} from 'src/app/modules/shared/components/confirmation-delete-modal/confirmation-delete-modal.component';
import { CoursesService } from 'src/app/modules/courses-page/services/courses.service';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent implements OnInit {

  public sortedCourses: Course[] = [];

  constructor(private orderByPipe: CoursesOrderByPipe,
              private coursesService: CoursesService,
              private modalService: ModalService,
              private changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe(
      (courses: Course[]) => this.updateCourseVisability(courses)
    );
  }

  public changeSearchText(searchText: string): void {
    this.coursesService.searchCourses(searchText).subscribe(
      (courses: Course[]) => this.updateCourseVisability(courses)
    );
  }

  public onDelete(course: Course): void {
    const modalRef = this.modalService.openModal(ConfirmationDeleteModalComponent);
    modalRef.instance.userAction.subscribe( (isDelete: boolean) => {
      if (isDelete) {
        this.coursesService.removeCourse(course).subscribe(
          () =>  this.coursesService.getAllCourses().subscribe(
            (courses: Course[]) => this.updateCourseVisability(courses)
          )
        );
      }
      this.modalService.closeModel(modalRef);
    });
  }

  public loadMore(): void {
    this.coursesService.loadCourses().subscribe(
      (courses: Course[]) => this.updateCourseVisability(this.sortedCourses.concat(courses))
    );
  }

  public updateCourseVisability(courses: Course[]): void {
    this.sortedCourses = this.orderByPipe.transform(courses, 'creationDate');
    this.changeDetectorRef.detectChanges();
  }
}

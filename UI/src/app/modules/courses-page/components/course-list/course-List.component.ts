import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';
import { CoursesOrderByPipe } from 'src/app/modules/courses-page/pipes/courses-order-by.pipe';
import { SearchCoursesPipe } from 'src/app/modules/courses-page/pipes/search-courses.pipe';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import {
  ConfirmationDeleteModalComponent
} from 'src/app/modules/shared/components/confirmation-delete-modal/confirmation-delete-modal.component';
import { CoursesService } from 'src/app/modules/shared/services/courses.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent implements OnInit, OnDestroy {

  public sortedCourses: Course[] = [];
  private _subscriptionCourses: Subscription = new Subscription();
  private _courses: Course[] = [];

  constructor(private orderByPipe: CoursesOrderByPipe,
              private coursesService: CoursesService,
              private modalService: ModalService,
              private changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this._subscriptionCourses = this.coursesService.courses.subscribe(
      (courses: Course[]) => this.updateCourseVisability(courses)
    );
    this.coursesService.getAllCourses();
  }

  public changeSearchText(searchText: string): void {
    this.coursesService.searchCourses(searchText);
  }

  public onDelete(course: Course): void {
    const modalRef = this.modalService.openModal(ConfirmationDeleteModalComponent);
    modalRef.instance.userAction.subscribe( (isDelete: boolean) => {
      if (isDelete) {
        this.coursesService.removeCourse(course);
      }
      this.modalService.closeModel(modalRef);
    });
  }

  public loadMore(): void {
    this.coursesService.loadCourses();
  }

  public updateCourseVisability(courses: Course[]): void {
    this._courses = courses;
    this.sortedCourses = this.orderByPipe.transform(this._courses, 'creationDate');
    this.changeDetectorRef.detectChanges();
  }

  public ngOnDestroy(): void {
    this._subscriptionCourses.unsubscribe();
  }
}

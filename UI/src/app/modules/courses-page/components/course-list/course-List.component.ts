import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import {
  ConfirmationDeleteModalComponent
} from 'src/app/modules/shared/components/confirmation-delete-modal/confirmation-delete-modal.component';
import { CoursesService } from 'src/app/modules/courses-page/services/courses.service';
import { Store, select } from '@ngrx/store';
import { CoursesState } from 'src/app/ngrx/courses/courses.state';
import { coursesSelector } from 'src/app/ngrx/courses/courses.selector';
import { Observable } from 'rxjs';
import { RemoveCourseAction } from 'src/app/ngrx/courses/courses.action';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent implements OnInit {

  public courses: Observable<Course[]> = this.store$.pipe(select(coursesSelector));

  constructor(private coursesService: CoursesService,
              private modalService: ModalService,
              private store$: Store<CoursesState>) {}

  public ngOnInit(): void {
    this.coursesService.getAllCourses();
  }

  public changeSearchText(searchText: string): void {
    this.coursesService.searchCourses(searchText);
  }

  public onDelete(course: Course): void {
    const modalRef = this.modalService.openModal(ConfirmationDeleteModalComponent);
    modalRef.instance.userAction.subscribe( (isDelete: boolean) => {
      if (isDelete) {
        this.store$.dispatch(new RemoveCourseAction({course: course}));
      }
      this.modalService.closeModel(modalRef);
    });
  }

  public loadMore(): void {
    this.coursesService.loadCourses();
  }
}

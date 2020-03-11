import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import {
  ConfirmationDeleteModalComponent
} from 'src/app/modules/shared/components/confirmation-delete-modal/confirmation-delete-modal.component';
import { Store, select } from '@ngrx/store';
import { ICoursesState } from 'src/app/ngrx/courses/courses.state';
import { coursesSelector } from 'src/app/ngrx/courses/courses.selector';
import { Observable } from 'rxjs';
import { DeleteCourseAction, ReadAllCoursesAction, LoadCoursesAction, ReadSearchCoursesAction } from 'src/app/ngrx/courses/courses.action';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent implements OnInit {

  public courses$: Observable<Course[]> = this.store$.pipe(select(coursesSelector));

  constructor(private modalService: ModalService,
              private store$: Store<ICoursesState>) {}

  public ngOnInit(): void {
    this.store$.dispatch(new ReadAllCoursesAction());
  }

  public changeSearchText(searchText: string): void {
    this.store$.dispatch(new ReadSearchCoursesAction({searchText: searchText}));
  }

  public onDelete(course: Course): void {
    const modalRef = this.modalService.openModal(ConfirmationDeleteModalComponent);
    modalRef.instance.userAction.subscribe( (isDelete: boolean) => {
      if (isDelete) {
        this.store$.dispatch(new DeleteCourseAction({course: course}));
      }
      this.modalService.closeModel(modalRef);
    });
  }

  public loadMore(): void {
    this.store$.dispatch(new LoadCoursesAction());
  }
}

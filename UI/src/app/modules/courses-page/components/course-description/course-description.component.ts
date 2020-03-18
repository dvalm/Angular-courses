import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import {
  ConfirmationDontSaveModalComponent
} from 'src/app/modules/shared/components/confirmation-dont-save-modal/confirmation-dont-save-modal.component';
import { Store, select } from '@ngrx/store';
import { ICoursesState } from 'src/app/ngrx/courses/courses.state';
import { CreateCourseAction, UpdateCourseAction } from 'src/app/ngrx/courses/courses.action';
import { getCourseByIdSelector } from 'src/app/ngrx/courses/courses.selector';

@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesDescriptionComponent implements OnInit {

  public courseDescription: FormGroup;
  private courseId: number = parseInt(this.activateRoute.snapshot.url[0].path, 10);

  constructor(private fb: FormBuilder,
    private datePipe: DatePipe,
    private modalService: ModalService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private store$: Store<ICoursesState>) { }

  public ngOnInit(): void {
    this.store$.pipe(select(getCourseByIdSelector, { id: this.courseId })).subscribe(
      (data: Course) => {
        if (data) {
          this.setCourseDescripton(data);
        } else {
          this.setCourseDescripton(new Course());
        }
      }
    );
  }

  public submit(): void {
    const courseValue = this.courseDescription.value;
    const id = this.courseId || null;
    const course: Course = new Course(id, courseValue.title, this.parseDateString(courseValue.date).toString(),
      parseInt(courseValue.duration.toString(), 10), courseValue.description, courseValue.isTopRated, courseValue.authors);
    if (this.courseId) {
      this.store$.dispatch(new UpdateCourseAction({ course: course }));
    } else {
      this.store$.dispatch(new CreateCourseAction({ course: course }));
    }
  }

  public goBack(): void {
    const modalRef = this.modalService.openModal(ConfirmationDontSaveModalComponent);
    modalRef.instance.userAction.subscribe((goBack: boolean) => {
      if (goBack) {
        this.router.navigateByUrl('/courses');
      }
      this.modalService.closeModel(modalRef);
    });
  }

  private setCourseDescripton(course: Course): void {
    this.courseDescription = this.fb.group({
      /* tslint:disable */
      // 50 and 500 is max length of string
      title: [course.title, [Validators.required, Validators.maxLength(50)]],
      description: [course.description, [Validators.required, Validators.maxLength(500)]],
      /* tslint:enable */
      date: [this.datePipe.transform(course.creationDate, 'dd/MM/yyyy')],
      duration: [course.duration],
      isTopRated: [course.isTopRated],
      authors: [course.authors]
    });
  }

  private parseDateString(dateString: string): Date {
    /* tslint:disable */
    // 6, 3, 5, 0, 2 are symbol position with we cotout in pattern: dd/mm/yyyy
    const year = parseInt(dateString.slice(6), 10);
    const month = parseInt(dateString.slice(3, 5), 10);
    const day = parseInt(dateString.slice(0, 2), 10);
    return new Date(year, month - 1, day);
    /* tslint:enable */
  }
}

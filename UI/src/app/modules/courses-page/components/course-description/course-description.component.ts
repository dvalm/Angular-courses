import { Component, Output, EventEmitter, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { Course } from '../../models/course';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CoursesService } from '../../services/courses.service';
import { ICourse } from '../../interfaces/courses';
import { TNullable } from '../../types/nullable.type';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import {
  ConfirmationDontSaveModalComponent
} from 'src/app/modules/shared/components/confirmation-dont-save-modal/confirmation-dont-save-modal.component';
import { Store, select } from '@ngrx/store';
import { CoursesState } from 'src/app/ngrx/courses/courses.state';
import { CreateCourseAction, UpdateCourseAction } from 'src/app/ngrx/courses/courses.action';
import { getCourseByIdSelector } from 'src/app/ngrx/courses/courses.selector';

@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesDescriptionComponent implements OnInit {

  @Output() changePage: EventEmitter<void> = new EventEmitter();
  @Input() course: TNullable<Course>;
  public courseDescription: FormGroup;
  private courseId: number = parseInt(this.activateRoute.snapshot.url[0].path, 10);

  constructor(private fb: FormBuilder,
    private datePipe: DatePipe,
    private modalService: ModalService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private store$: Store<CoursesState>) { }

  public ngOnInit(): void {

    this.store$.pipe(select(getCourseByIdSelector, { id: this.courseId })).subscribe(
      (data: ICourse) => {
        if (data) {
          this.setCourseDescripton(data as Course);
        } else {
          this.setCourseDescripton(new Course());
        }
      }
    );
  }

  public submit(): void {
    const course: ICourse = this.courseDescription.value;
    course.creationDate = this.parseDateString(course.date);
    course.duration = parseInt(course.duration.toString(), 10);
    if (this.courseId) {
      course.id = this.courseId;
      this.store$.dispatch(new UpdateCourseAction({ course: course }));
    } else {
      const mycourse = new Course(course.id, course.title, course.creationDate.toString(),
        course.duration, course.description, course.isTopRated);
      this.store$.dispatch(new CreateCourseAction({ course: mycourse }));
    }
  }

  public goBack(): void {
    if (this.courseDescription.touched) {
      const modalRef = this.modalService.openModal(ConfirmationDontSaveModalComponent);
      modalRef.instance.userAction.subscribe((goBack: boolean) => {
        if (goBack) {
          this.router.navigateByUrl('/courses');
        }
        this.modalService.closeModel(modalRef);
      });
    } else {
      this.router.navigateByUrl('/courses');
    }
  }

  private setCourseDescripton(course: Course): void {
    this.courseDescription = this.fb.group({
      title: [course.title, Validators.required],
      description: [course.description, Validators.required],
      date: [this.datePipe.transform(course.creationDate, 'dd/MM/yyyy'), Validators.required],
      duration: [course.duration, Validators.required],
      isTopRated: [course.isTopRated]
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

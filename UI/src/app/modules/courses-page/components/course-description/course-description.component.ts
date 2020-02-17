import { Component, Output, EventEmitter, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { Course } from '../../models/course';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CoursesService } from '../../../shared/services/courses.service';
import { ICourse } from '../../interfaces/courses';
import { TNullable } from '../../types/nullable.type';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import {
ConfirmationDontSaveModalComponent
} from 'src/app/modules/shared/components/confirmation-dont-save-modal/confirmation-dont-save-modal.component';

@Component({
    selector: 'app-course-description',
    templateUrl: './course-description.component.html',
    styleUrls: ['./course-description.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CoursesDescriptionComponent implements OnInit {

    @Output() changePage:  EventEmitter<void> = new EventEmitter();
    @Input() course: TNullable<Course>;
    public courseDescription: FormGroup;
    private courseId: number = parseInt(this.activateRoute.snapshot.url[0].path, 10);

    constructor(private fb: FormBuilder,
                private datePipe: DatePipe,
                private modalService: ModalService,
                private activateRoute: ActivatedRoute,
                private router: Router,
                private coursesService: CoursesService) {}

    public ngOnInit(): void {
      const course = this.courseId ? this.coursesService.getCourseById(this.courseId) : new Course();
      this.setCourseDescripton(course);
    }

    public submit(): void {
      const course: ICourse = this.courseDescription.value;
      course.creationDate = this.parseDateString(course.date);
      if (this.courseId) {
        course.id = this.courseId;
        this.coursesService.updateCourse(course);
      } else {
        this.coursesService.createCourse(new Course(course.id, course.title, course.creationDate.toString(),
        course.duration, course.description, course.isTopRated));
      }
    }

    public goBack(): void {
      if (this.courseDescription.touched) {
        const modalRef = this.modalService.openModal(ConfirmationDontSaveModalComponent);
        modalRef.instance.userAction.subscribe( (goBack: boolean) => {
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
      const month =  parseInt(dateString.slice(3,5), 10);
      const day = parseInt(dateString.slice(0,2), 10);
      return new Date(year, month - 1, day);
/* tslint:enable */
    }
}

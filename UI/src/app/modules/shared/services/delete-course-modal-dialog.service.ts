import {Injectable} from '@angular/core';
import { DeleteCourseModalDialogComponent } from '../components/delete-course-modal-dialog/delete-course-modal-dialog.component';
import { Course } from '../../courses-page/models/course';
import { CoursesService } from '../../courses-page/services/courses.service';
import { CourseListComponent } from '../../courses-page/components/course-list/course-List.component';
 
@Injectable({
    providedIn: 'root'
})
export class DeleteCourseModalDialogService{

    private modalDialog: DeleteCourseModalDialogComponent;
    private course: Course;
    private courseList: CourseListComponent;

    constructor( private coursesService: CoursesService){}

    public add(value: DeleteCourseModalDialogComponent):void {
        this.modalDialog = value;
    }

    public open():void {
        this.modalDialog.open();
    }

    public close():void {        
        this.modalDialog.close();
    }

    public deleteCourse(deleteCourse: boolean):void {
        if(deleteCourse){
            this.coursesService.removeCourse(this.course);
            this.courseList.updateCourseVisability();
        }
        this.close();
    }

    public addDeleteCourse(courseList: CourseListComponent, course: Course):void {
        this.courseList = courseList;
        this.course = course;
    }
}
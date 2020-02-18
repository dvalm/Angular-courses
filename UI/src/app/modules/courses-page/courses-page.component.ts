import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Course } from './models/course';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesPageComponent implements OnInit {

  public isCourseDescriptionOpen = false;
  public course: Course;

  constructor(private httpClient: HttpClient,
              private cdRef: ChangeDetectorRef) { }

  public ngOnInit(): void {}
}

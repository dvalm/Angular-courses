import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesPageComponent implements OnInit {

  public isCourseDescriptionOpen = false;

  constructor(private httpClient: HttpClient, private cdRef: ChangeDetectorRef) { }

  public ngOnInit(): void {}

  public changePage(value: boolean): void {
    this.isCourseDescriptionOpen = value;
  }

}

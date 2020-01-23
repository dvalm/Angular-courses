import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICourse} from "src/app/modules/courses-page/interfaces/courses";

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesPageComponent implements OnInit {
  public items: any = [ ];

  constructor(private httpClient: HttpClient, private cdRef: ChangeDetectorRef) { }

  public ngOnInit(): void {}

}

import { Component, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, concatMap } from 'rxjs/operators';

@Component({
    selector: 'app-course-control-panel',
    templateUrl: './course-control-panel.component.html',
    styleUrls: ['./course-control-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CourseControlPanelComponent implements OnInit {

    @Output() changeSearchText:  EventEmitter<string> = new EventEmitter<string>();

    private _sbj = new Subject<string>();

    public ngOnInit(): void {
      this._sbj.pipe(
/* tslint:disable */
// 500 is 0.5s of debounce time
        debounceTime(500),
/* tslint:enable */
        distinctUntilChanged(),
        filter(
/* tslint:disable */
//  3 chars are needed to send a request
          (searchText: string) => searchText.length >= 3 || searchText.length === 0
/* tslint:enable */
        ),
        concatMap((searchText: string) => of(this.search(searchText)))
      ).subscribe();
    }

    public searchTextChange(event: string): void {
      this._sbj.next(event);
    }

    public search(searchText: string): void {
      this.changeSearchText.emit(searchText);
    }
  }

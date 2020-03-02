import { Component, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
    selector: 'app-course-control-panel',
    templateUrl: './course-control-panel.component.html',
    styleUrls: ['./course-control-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CourseControlPanelComponent implements AfterViewInit {

    @Output() changeSearchText:  EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

    public searchText: string;

    public ngAfterViewInit(): void {
      fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
/* tslint:disable */
// 500 is 0.5s of debounce time
        debounceTime(500),
/* tslint:enable */
        distinctUntilChanged(),
        filter(
/* tslint:disable */
//  3 chars are needed to send a request
          () => this.searchText.length >= 3 || this.searchText.length === 0
/* tslint:enable */
        )
      ).subscribe(
        () => this.search()
      );
    }

    public search(): void {
      this.changeSearchText.emit(this.searchText);
    }
  }

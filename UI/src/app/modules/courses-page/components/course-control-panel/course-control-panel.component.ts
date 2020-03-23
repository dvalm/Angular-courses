import { Component, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

const minCountOfCharsToSearch = 3;

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
        debounceTime(500),
        distinctUntilChanged(),
        filter(
          (searchText: string) => searchText.length >= minCountOfCharsToSearch || searchText.length === 0
        ),
        switchMap((searchText: string) => of(this.search(searchText)))
      ).subscribe();
    }

    public searchTextChange(event: string): void {
      this._sbj.next(event);
    }

    public search(searchText: string): void {
      this.changeSearchText.emit(searchText);
    }
  }

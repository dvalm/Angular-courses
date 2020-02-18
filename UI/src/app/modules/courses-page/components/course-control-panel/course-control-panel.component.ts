import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-course-control-panel',
    templateUrl: './course-control-panel.component.html',
    styleUrls: ['./course-control-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CourseControlPanelComponent {

    @Output() changeSearchText:  EventEmitter<string> = new EventEmitter<string>();

    public searchText: string;

    public search(): void {
      this.changeSearchText.emit(this.searchText);
    }
  }

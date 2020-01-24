import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-course-control-panel',
    templateUrl: './course-control-panel.component.html',
    styleUrls: ['./course-control-panel.component.scss']
  })
  export class CourseControlPanelComponent{

    @Input() searchText: string;
    @Output() changeSearchText:  EventEmitter<any> = new EventEmitter<string>();

    public search(): void{
      this.changeSearchText.emit(this.searchText);
      console.log(this.searchText);
    }  
  }
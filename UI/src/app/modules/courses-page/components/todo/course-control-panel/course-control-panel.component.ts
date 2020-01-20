import { Component } from '@angular/core';

@Component({
    selector: 'app-course-control-panel',
    templateUrl: './course-control-panel.component.html',
    styleUrls: ['./course-control-panel.component.scss']
  })
  export class CourseControlPanelComponent{

    public inputText: string;

    public search(): void{
      console.log(this.inputText);
    }  
  }
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-loading-block',
    templateUrl: './loading-block.component.html',
    styleUrls: ['./loading-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class LoadingBlockComponent {}

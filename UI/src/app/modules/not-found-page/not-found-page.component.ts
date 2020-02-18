import {Component, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { AuthorizationService } from '../shared/services/authorization.service';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPageComponent {}

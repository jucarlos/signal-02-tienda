import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent { }

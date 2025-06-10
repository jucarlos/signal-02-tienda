import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-store-front-layout',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './store-front-layout.component.html',
  styleUrls: ['./store-front-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreFrontLayoutComponent { }

import {Component} from '@angular/core';
import {ApiImageService} from "./apiimage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testBell';
  isHided = false;
  constructor(public apiImageService: ApiImageService) {
  }
}

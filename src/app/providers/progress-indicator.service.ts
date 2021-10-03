import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProgressIndicatiorService {
  public showIndicator = new BehaviorSubject(false);


  constructor() {
  }

  public show() {
    this.showIndicator.next(true);
  }

  public hide() {
    this.showIndicator.next(false);
  }

}

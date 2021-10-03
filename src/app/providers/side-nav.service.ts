import {Injectable} from '@angular/core';

@Injectable()
export class NavService {
  public appDrawer: any;
  public onItemSelected: Function;


  constructor() {
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }

  public collapse(){
    this.onItemSelected();
  }

}

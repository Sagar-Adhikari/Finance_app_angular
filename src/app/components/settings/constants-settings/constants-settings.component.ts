import { GlobalService } from 'src/app/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-constants-settings',
  templateUrl: './constants-settings.component.html',
  styleUrls: ['./constants-settings.component.css']
})
export class ConstantsSettingsComponent implements OnInit {

  constructor(private globalService:GlobalService) {
    this.globalService.setLayout({pageTitle:'Constant Setting',allowFooter:true});
   }

  ngOnInit(): void {
  }

}

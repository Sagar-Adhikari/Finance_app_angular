import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-all-group',
  templateUrl: './all-group.component.html',
  styleUrls: ['./all-group.component.css']
})
export class AllGroupComponent implements OnInit {

  public allGroup:string;
  public allGroupList:string[];
  constructor(private reportService: CommonService) { }

  ngOnInit(): void {
  }

}

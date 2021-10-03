import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { AntGroup } from 'src/app/models/ant-group.model';

@Component({
  selector: 'app-group-selector',
  templateUrl: './group-selector.component.html',
  styleUrls: ['./group-selector.component.css']
})
export class GroupSelectorComponent implements OnInit {

  public antGroups: AntGroup[];
  public selectedAntGroup: AntGroup;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.getAngGrps().subscribe(lsG => {
      this.antGroups = lsG as AntGroup[];
    });
  }

}

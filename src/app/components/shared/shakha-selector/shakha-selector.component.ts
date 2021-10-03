import { Component, OnInit } from '@angular/core';
import { TblShakhaModel } from 'src/app/models/shakha-model';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-shakha-selector',
  templateUrl: './shakha-selector.component.html',
  styleUrls: ['./shakha-selector.component.css']
})
export class ShakhaSelectorComponent implements OnInit {

  public shakha: TblShakhaModel;
  public shakhaList: TblShakhaModel[];
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.getShakhas().subscribe((x) => {
      this.shakhaList = x as TblShakhaModel[];
    });
  }
}

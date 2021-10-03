import { Component, OnInit, Input } from '@angular/core';
import { TinpusteReportView } from 'src/app/models/member.model';

@Component({
  selector: 'app-tin-puste',
  templateUrl: './tin-puste.component.html',
  styleUrls: ['./tin-puste.component.css']
})
export class TinPusteComponent implements OnInit {

  @Input() tinPusteReport: TinpusteReportView;
  public title: String = "Tin Puste Report";
  public today = Date.now();

  constructor() { }


  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { RinRakamReportView } from 'src/app/models/loan-filter.model';

@Component({
  selector: 'app-rin-rakam',
  templateUrl: './rin-rakam.component.html',
  styleUrls: ['./rin-rakam.component.css']
})
export class RinRakamComponent implements OnInit {

  @Input() rinRakamReport: RinRakamReportView;

  public title: String = "Rin Rakam Report";
  public today = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}

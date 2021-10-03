import { Component, OnInit, Input } from '@angular/core';
import { RinTerijReportView } from 'src/app/models/loan-filter.model';

@Component({
  selector: 'app-rin-terij',
  templateUrl: './rin-terij.component.html',
  styleUrls: ['./rin-terij.component.css']
})
export class RinTerijComponent implements OnInit {

  @Input() rinTerijReport: RinTerijReportView;

  public title: String = "Rin Terij Report";
  public today = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}

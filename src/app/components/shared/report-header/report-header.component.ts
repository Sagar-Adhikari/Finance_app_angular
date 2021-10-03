import { Component, OnInit, Input } from '@angular/core';
import { ReportHeader } from 'src/app/models/reporting.model';

@Component({
  selector: 'app-report-header',
  templateUrl: './report-header.component.html',
  styleUrls: ['./report-header.component.css']
})
export class ReportHeaderComponent implements OnInit {

  @Input() header: ReportHeader;
  @Input() title: String;

  constructor() { }

  ngOnInit(): void {
    console.log(this.title);
  }

}

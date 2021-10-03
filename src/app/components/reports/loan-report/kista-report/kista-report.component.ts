import { GlobalService } from 'src/app/global.service';
import { Component, OnInit, Input } from '@angular/core';
import { KistaReportView } from 'src/app/models/loan-filter.model';
import kistaReportCss from './kista-report.component.css';
@Component({
  selector: 'app-kista-report',
  templateUrl: './kista-report.component.html',
  styleUrls: ['./kista-report.component.css']
})
export class KistaReportComponent implements OnInit {

  @Input() kistaReport: KistaReportView;

  public title: String = "Kista Report";
  public today = Date.now();

  constructor(private globalService:GlobalService) { }

  ngOnInit(): void {


  }
  onPrintClicked(){
    this.globalService.printDocument(kistaReportCss);

  }



}

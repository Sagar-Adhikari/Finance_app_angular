import { GlobalService } from 'src/app/global.service';
import { Component, OnInit, Input } from '@angular/core';
import { ReportService } from 'src/app/core/services/report.service';
import { MemberReportView, MemberFilterData } from 'src/app/models/member.model';
import memberReportViewCss from './member-report-view.component.css';
@Component({
  selector: 'app-member-report-view',
  templateUrl: './member-report-view.component.html',
  styleUrls: ['./member-report-view.component.css']
})
export class MemberReportViewComponent implements OnInit {

  @Input() memberReport: MemberReportView;
  public title: String = "Members Report";
  public today = Date.now();

  constructor(private reportService: ReportService,private globalService:GlobalService) { }


  ngOnInit(): void {

  }
  onPrintClicked(){

    this.globalService.printDocument(memberReportViewCss);
  }


}

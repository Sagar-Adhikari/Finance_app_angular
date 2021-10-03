import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TblLogService } from 'src/app/core/services/tbllog.service';
import { TblLogModel, TblLogActivityView } from './tblLog.model';
import { PaginationView } from 'src/app/models/api-reponse.model';

@Component({
  selector: 'app-activity-monitor-dash',
  templateUrl: './activity-monitor-dash.component.html',
  styleUrls: ['./activity-monitor-dash.component.css']
})
export class ActivityMonitorDashComponent implements OnInit {

  constructor(
    private tblLogService: TblLogService) { }


  dataArr: TblLogActivityView[];
  dataSource = new MatTableDataSource<TblLogActivityView>([]);
  activityData: PaginationView<TblLogModel>;

  displayedColumns: string[] = ['sysDate', 'action', 'userID'];
  handler: any;

  ngOnInit(): void {
    this.getTblLogs();
    var that = this;
    this.handler = window.setInterval(function () {      
      that.getTblLogs();
    }, 15000);
  }

  
  ngOnDestroy(): void {
    clearInterval(this.handler);
  }

  getTblLogs() {
    this.tblLogService.getLogs(0, 5).subscribe(l => {
      this.activityData = l as PaginationView<TblLogModel>;
      if (this.activityData != null && this.activityData.contents != null && this.activityData.contents.length > 0) {
        var arr: TblLogActivityView[];
        this.dataSource.data = this.activityData.contents.map(c => {
          return new TblLogActivityView(
            c.sysDate, 
            c.moduleName + "-" + c.actionName, 
            c.userID);
        });
      }
    });
  }

}

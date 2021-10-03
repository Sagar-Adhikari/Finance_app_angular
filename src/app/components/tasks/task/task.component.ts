import { GlobalService } from './../../../global.service';
import { Component, OnInit } from "@angular/core";
import { TaskService } from "../task.service";
import { Router } from '@angular/router';
import { TblTaskListModel } from 'src/app/models/task.model';

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskComponent implements OnInit {
  data: TblTaskListModel[];
  totalRows: number;
  displayedColumns: string[] = ['taskId', 'taskName', 'remarks', 'isDeny', 'ordId', 'action'];


  constructor(private taskService: TaskService, private globalService: GlobalService, private router: Router, ) {
    this.globalService.setLayout({ pageTitle: 'Task List', allowFooter: false });
  }

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe((x: any) => {
      this.data = x;

    });
  }

  addNewTask() {
    this.router.navigate(['/addnewtask']);
  }

  editTask(task: TblTaskListModel) {
    this.router.navigate(['/editTask', { taskId: task.taskId }]);
  }

}

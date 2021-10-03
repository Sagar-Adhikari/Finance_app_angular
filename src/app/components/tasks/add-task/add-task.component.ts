import { Component, OnInit } from '@angular/core';
import { TblTaskListModel } from 'src/app/models/task.model';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskName: string;
  remarks: string;
  isDenied: boolean;
  orderId: number;
  loading: boolean = false;
  taskId: number = 0;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
  ) {
    this.globalService.setLayout({pageTitle:'Add Task',allowFooter:false});
  }

  ngOnInit(): void {
    this.checkEditMode();
  }

  submit() {
    if (this.taskName == null || this.taskName.length == 0) {
      this.globalService.showMessageError('Task name can not be null');
      return;
    }
    this.loading = true;

    var taskModel = new TblTaskListModel(
      this.taskName,
      this.remarks,
      this.isDenied,
      this.orderId
    );

    taskModel.taskId = this.taskId;

    this.taskService.upsertTask(taskModel).subscribe(resp => {

      this.loading = false;
      var msg = this.taskId > 0 ? 'Task updated.' : 'New task created.';
      this.globalService.showMessageSuccess(msg);
      this.router.navigate(["/task"]);

    }, error => {
      this.globalService.showMessageError(error.error);

      this.loading = false;
      console.log(error);
    });
  }

  private checkEditMode() {
    this.route.paramMap.subscribe((params) => {
      var existingTask = params.get("taskId");
      if (existingTask == null) return;
      this.globalService.setLayout({pageTitle:'edit Task',allowFooter:false});
      this.loading = true;

      this.taskService.getTask(parseInt(existingTask)).subscribe(resp => {

        var t = resp as TblTaskListModel;
        this.taskName = t.taskName;
        this.remarks = t.remarks;
        this.orderId = t.ordId;
        this.isDenied = t.isDeny;
        this.loading = false;
        this.taskId = t.taskId;

      }, error => {
        this.globalService.showMessageError(error.error);

        this.loading = false;
        console.log(error);
      });
    });
  }

  goBack() {
    this.router.navigate(["/task"]);
  }

}

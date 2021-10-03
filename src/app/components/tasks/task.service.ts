import { environment } from 'src/environments/environment';
import { BaseService } from './../../core/services/base.service';
import { Injectable } from '@angular/core';
import { TblTaskListModel } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private baseService: BaseService) { }

  getTask(taskId: number) {
    var url = environment.roleManagerApiUrl + "/taskList/getTask";
    return this.baseService.get(url, { "taskId": taskId });
  }

  getAllTasks() {
    var url = environment.roleManagerApiUrl + "/taskList/getTaskList";
    return this.baseService.get(url, {});
  }

  upsertTask(task: TblTaskListModel) {
    var url = environment.roleManagerApiUrl + "/taskList/upsertTask";
    return this.baseService.post(url, {}, task);
  }
  getTaskForRoles(roleID?: number) {
    var url = environment.roleManagerApiUrl +' role/getTasksForRole/';
    return this.baseService.get(url,  roleID);
  }

}

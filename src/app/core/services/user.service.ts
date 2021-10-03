import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AuthUser, ChangePasswordView } from 'src/app/models/authUser.model';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private baseService: BaseService,
    ) {
    }

     getAuthUser() {
        var url = environment.roleManagerApiUrl + '/user/getAuth'
        return this.baseService.get(url, {});
    };

    getAllUsers(page: number, limit:number) {
      var url = environment.roleManagerApiUrl + '/user/getUsers'
      return this.baseService.get(url, {
          page: page,
          limit: limit,
      });
    }

    createNewUser(user: Object) {
        var url = environment.roleManagerApiUrl + '/user/createNewUser'
        return this.baseService.post(url, {}, user);
    }

    updateUser(userId: string, user:Object) {
        var url = environment.roleManagerApiUrl + `/user/updateUser/${userId}`
        return this.baseService.post(url, {}, user)
    }

    deleteUser(userId: string) {
        var url = environment.roleManagerApiUrl + `/user/deleteUser/${userId}`
        return this.baseService.post(url, {},  null);
    }

    changePassword(cpModel: ChangePasswordView) {
        var url = environment.roleManagerApiUrl + '/user/changePassword'
        return this.baseService.post(url, null, cpModel, true);
    }
}
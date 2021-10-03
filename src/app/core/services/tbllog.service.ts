import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TblLogService {
    constructor(
        private baseService: BaseService,
    ) {
    }

    getLogs(page: number, limit: number) {
        var url = environment.roleManagerApiUrl + '/tblLog/getTblLogs'
        return this.baseService.get(url, {
            page: page,
            limit: limit,
        });
    }
}
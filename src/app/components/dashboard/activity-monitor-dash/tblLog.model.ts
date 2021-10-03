export class TblLogModel {
    sN: number;
    datedN: string;
    maxTranDate: string;
    tranAN: number;
    moduleName: string;
    actionName: string;
    actionText: string;
    userID: string;
    logType: number;
    sysDate: string;
}


export class TblLogActivityView {
    constructor(
        public sysDate: string,
        public action: string,
        public userID: string,) {
    }
}
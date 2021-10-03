export class TblTaskListModel {
    
    public taskId: number;
    constructor(
        public taskName: string,
        public remarks: string,
        public isDeny: boolean,
        public ordId: number,
    ){}
}
export class TblShakhaModel {
    shakhaID: number;
    shakhaName: string;
    shakhaNameDev: string;
    shakhaDesc: string;
}

export class SelectedShakhaModel {
    constructor(public shakhaID: number, public shakhaName: string){}
}
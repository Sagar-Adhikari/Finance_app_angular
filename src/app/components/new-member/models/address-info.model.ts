export class AddressInfoModel {
    public currentAddress: AddressModel = new AddressModel();
    public permanentAddress: AddressModel = new AddressModel();
    public curSameAsPermAdd: boolean;
}
export class AddressModel {
    public country: string;
    public province: string;
    public district: string;
    public vdcMunci: string;
    public wardNum: number;
    public tole: string;
}

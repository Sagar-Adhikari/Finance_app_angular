import { Role } from '../models/role';
import { TblSngRegModel } from '../models/loan-settings-model';
import { SelectedShakhaModel } from '../models/shakha-model';

export interface PwSettingsState {
    regModels: TblSngRegModel[];
    nepaliDate: Date;
    loading: boolean;
    errormsg: string;
    selectedShakha: SelectedShakhaModel;
}

export const initialSettingsState: PwSettingsState = {
    regModels: null,
    loading: false,
    nepaliDate: null,
    errormsg: '',
    selectedShakha: null
};

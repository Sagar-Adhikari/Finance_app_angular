import { createAction, props } from '@ngrx/store';
import { TblSngRegModel } from '../models/loan-settings-model';
import { SelectedShakhaModel } from '../models/shakha-model';

export const getSettings = createAction('[Settings Page] Settings');
export const getSettingsComplete = createAction('[Settings Page] Settings loaded', props<{ payload: TblSngRegModel[]}>());


export const getNepaliDate = createAction('[Settings Page] Nepali Date');
export const getNepaliDateComplete = createAction('[Settings Page] Nepali Date loaded', props<{ payload: Date}>());

export const updateSelectedShakha = createAction('[Toolbar] Update Selected Shakha', props<{ payload: SelectedShakhaModel}>());
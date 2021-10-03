import { initialSettingsState, PwSettingsState } from '../state/pw-settings.state';
import * as SettingsActions from '../actions/pw-settings.action';
import { on, createReducer, Action } from '@ngrx/store';

const settingsReducer = createReducer(
  initialSettingsState,
    on(SettingsActions.getSettings, state => ({
      ...state,
      regModels: null,
      loading: true,
      errormsg: null
    })),
    on(SettingsActions.getSettingsComplete, (state: PwSettingsState, { payload } ) => ({
      ...state,
      regModels: payload,
      loading: false,
      errormsg: null
    })),
    on(SettingsActions.getNepaliDate, state => ({
      ...state,
      nepaliDate: null,
    })),
    on(SettingsActions.getNepaliDateComplete, (state: PwSettingsState, { payload } ) => ({
      ...state,
      nepaliDate: payload,
    })),
    on(SettingsActions.updateSelectedShakha, (state: PwSettingsState, {payload}) => ({
      ...state,
      selectedShakha: payload
    }))
  );

  export function PwSettingsReducer(state: PwSettingsState | undefined, action: Action) {
    return settingsReducer(state, action);
  }
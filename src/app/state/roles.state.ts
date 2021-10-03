import { Role } from '../models/role';

export interface RolesState {
    roles: Role[];
    loadng: boolean;
    errormsg: string;
}

export const initialRolesState: RolesState = {
    roles: null,
    loadng: false,
    errormsg: ''
};

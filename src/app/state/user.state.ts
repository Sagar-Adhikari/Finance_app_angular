import { AuthUser } from '../models/authuser.model';


export interface UserState {
    user: AuthUser;
    loading: boolean;
    errormsg: string;
}

export const initialuserState: UserState = {
    user: null,
    loading: false,
    errormsg: ''
};
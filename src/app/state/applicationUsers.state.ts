import { ApplicationUser } from '../models/applicationUser.model';
import { PaginationView } from '../models/api-reponse.model';


export interface ApplicationUsersState {
    users: PaginationView<ApplicationUser>;
    loadng: boolean;
    errormsg: string;
}

export const initialApplicationUsersState: ApplicationUsersState = {
    users: null,
    loadng: false,
    errormsg: ''
};
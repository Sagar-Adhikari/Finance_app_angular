import { userDetail } from './newUser.model';
export class ApplicationUser {
    constructor(
        public id: string,
        public username: string,
        public roles: string[],
        public firstName: string,
        public lastName: string,
       public userDetail:userDetail[],
        ) {}
}


export class AuthUser {
    constructor(public username: string, public firstName: string, public lastName: string, public roles: string[], public shakhaId: number,
        public shakha: string) { }
}

export class ChangePasswordView {
    constructor(public password: string, public newPassword: string, public confirmPassword: string) { }
}
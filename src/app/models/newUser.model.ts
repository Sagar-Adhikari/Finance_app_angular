export class NewUser {
  constructor(
    public username: string,
    public roles: string[],
    public firstName: string,
    public lastName: string,
    public password: string,
    public post: string,
    public shakhaId: number,    
  ) {}
}

export class userDetail {
  constructor(
    public post: string,
    public postDev: string,

  ) {}
}

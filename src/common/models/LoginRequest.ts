
export class LoginRequest {
  public email: string = "";
  public password: string = "";
constructor(obj = {} as any) {
  obj = obj || {};
  this.email = obj.email === null? "" : obj.email;
  this.password = obj.password === null? "" : obj.password;
}

}

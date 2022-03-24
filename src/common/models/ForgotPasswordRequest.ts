
export class ForgotPasswordRequest {
  public email: string = "";
constructor(obj = {} as any) {
  obj = obj || {};
  this.email = obj.email === null? "" : obj.email;
}

}

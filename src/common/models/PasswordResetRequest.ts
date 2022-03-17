
export class PasswordResetRequest {
  public newPassword: string = "";
  public confirmNewPassword: string = "";
  public token: string = "";
constructor(obj = {} as any) {
  obj = obj || {};
  this.newPassword = obj.newPassword === null? "" : obj.newPassword;
  this.confirmNewPassword = obj.confirmNewPassword === null? "" : obj.confirmNewPassword;
  this.token = obj.token === null? "" : obj.token;
}

}

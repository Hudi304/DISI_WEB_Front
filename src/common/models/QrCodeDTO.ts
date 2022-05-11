
export class QrCodeDTO {
  public email: string = "";
  public code: string = "";
constructor(obj = {} as any) {
  obj = obj || {};
  this.email = obj.email === null? "" : obj.email;
  this.code = obj.code === null? "" : obj.code;
}

}

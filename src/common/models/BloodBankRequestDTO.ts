
export class BloodBankRequestDTO {
  public userEmail: string = "";
  public userName: string = "";
  public city: string = "";
  public bloodType: string = "";
constructor(obj = {} as any) {
  obj = obj || {};
  this.userEmail = obj.userEmail === null? "" : obj.userEmail;
  this.userName = obj.userName === null? "" : obj.userName;
  this.city = obj.city === null? "" : obj.city;
  this.bloodType = obj.bloodType === null? "" : obj.bloodType;
}

}

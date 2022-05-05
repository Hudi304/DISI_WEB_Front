
export class UserProfileDTO {
  public cnp: string = "";
  public weight: number | string = "";
  public age: number | string = "";
  public sex: string = "";
  public bloodType: string = "";
constructor(obj = {} as any) {
  obj = obj || {};
  this.cnp = obj.cnp === null? "" : obj.cnp;
  this.weight = obj.weight === null? "" : obj.weight;
  this.age = obj.age === null? "" : obj.age;
  this.sex = obj.sex === null? "" : obj.sex;
  this.bloodType = obj.bloodType === null? "" : obj.bloodType;
}

}

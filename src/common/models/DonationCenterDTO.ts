
export class DonationCenterDTO {
  public name: string = "";
  public latitude: number | string = "";
  public longitude: number | string = "";
  public city: string = "";
constructor(obj = {} as any) {
  obj = obj || {};
  this.name = obj.name === null? "" : obj.name;
  this.latitude = obj.latitude === null? "" : obj.latitude;
  this.longitude = obj.longitude === null? "" : obj.longitude;
  this.city = obj.city === null? "" : obj.city;
}

}

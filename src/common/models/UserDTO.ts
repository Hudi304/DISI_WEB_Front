import { Link } from './Link';

export class UserDTO {
  public id: string = "";
  public username: string = "";
  public password: string = "";
  public name: string = "";
  public address: string = "";
  public birthdate: string = "";
  public admin: boolean = false;
  public links: Link[] = [];
  public isAdmin: boolean = false;
constructor(obj = {} as any) {
  obj = obj || {};
  this.id = obj.id === null? "" : obj.id;
  this.username = obj.username === null? "" : obj.username;
  this.password = obj.password === null? "" : obj.password;
  this.name = obj.name === null? "" : obj.name;
  this.address = obj.address === null? "" : obj.address;
  this.birthdate = obj.birthdate === null? "" : obj.birthdate;
  this.admin = obj.admin === null? false : obj.admin;
  this.links = obj.links?.filter((item: any) => item !== undefined).map((item: any) => new Link(item)) || [];
  this.isAdmin = obj.isAdmin === null? false : obj.isAdmin;
}

}

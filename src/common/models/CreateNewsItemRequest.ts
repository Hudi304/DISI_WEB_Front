
export class CreateNewsItemRequest {
  public title: string = "";
  public description: string = "";
constructor(obj = {} as any) {
  obj = obj || {};
  this.title = obj.title === null? "" : obj.title;
  this.description = obj.description === null? "" : obj.description;
}

}

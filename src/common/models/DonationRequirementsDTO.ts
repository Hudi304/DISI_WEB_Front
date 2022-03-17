
export class DonationRequirementsDTO {
  public minAge: number | string = "";
  public maxAge: number | string = "";
  public minWeight: number | string = "";
  public maxWeight: number | string = "";
  public hasTattooOrPiercing: boolean = false;
  public hasDonatedBlood: boolean = false;
  public hasBloodTransmittedDisease: boolean = false;
  public hasTakenAntibiotics: boolean = false;
  public hasHeartProblems: boolean = false;
  public hasGivenBirth: boolean = false;
  public hasHadVenerealDiseases: boolean = false;
  public isAllergic: boolean = false;
constructor(obj = {} as any) {
  obj = obj || {};
  this.minAge = obj.minAge === null? "" : obj.minAge;
  this.maxAge = obj.maxAge === null? "" : obj.maxAge;
  this.minWeight = obj.minWeight === null? "" : obj.minWeight;
  this.maxWeight = obj.maxWeight === null? "" : obj.maxWeight;
  this.hasTattooOrPiercing = obj.hasTattooOrPiercing === null? false : obj.hasTattooOrPiercing;
  this.hasDonatedBlood = obj.hasDonatedBlood === null? false : obj.hasDonatedBlood;
  this.hasBloodTransmittedDisease = obj.hasBloodTransmittedDisease === null? false : obj.hasBloodTransmittedDisease;
  this.hasTakenAntibiotics = obj.hasTakenAntibiotics === null? false : obj.hasTakenAntibiotics;
  this.hasHeartProblems = obj.hasHeartProblems === null? false : obj.hasHeartProblems;
  this.hasGivenBirth = obj.hasGivenBirth === null? false : obj.hasGivenBirth;
  this.hasHadVenerealDiseases = obj.hasHadVenerealDiseases === null? false : obj.hasHadVenerealDiseases;
  this.isAllergic = obj.isAllergic === null? false : obj.isAllergic;
}

}

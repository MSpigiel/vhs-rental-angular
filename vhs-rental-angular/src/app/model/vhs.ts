export class Vhs {
  constructor(
  public id: number,
  public modificationCounter: number,
  public title: string,
  public director: string,
  public genre: string,
  public productionCountry: string,
  public productionDate: string,
  public rating: number,
  public posterUrl: string,
  public duration: number,
  public available: boolean) {}
}

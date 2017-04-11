import {Vhs} from './vhs';
export class RentInfo {
  constructor(
    public vhs: Vhs,
    public socialSecurity: number,
    public rentalStartDate: String,
    public rentDays: number) {}
}

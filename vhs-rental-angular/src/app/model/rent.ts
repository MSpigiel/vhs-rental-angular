import {Vhs} from './vhs';
export class Rent {
  constructor(
    public vhs: Vhs,
    public socialSecurity: number,
    public rentDays: number) {}
}

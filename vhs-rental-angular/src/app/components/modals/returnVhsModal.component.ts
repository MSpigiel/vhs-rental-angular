import {Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {RentInfo} from '../../model/rentInfo';
@Component({
  selector: 'returnVhs-selector',
  templateUrl: './../../templates/modalsTemplates/returnVhs.html'
})
export class ReturnVhsComponent implements OnInit {
  @Input() currentRent: RentInfo;
  @Output() notify: EventEmitter<any> = new EventEmitter();

  readonly baseFee: number = 5;
  readonly notRewindedFee: number = 5;
  readonly overextendedReturnFee: number = 10;
  readonly lostVhsFee: number = 50;

  overextendedDays: number = 0;
  totalFee: number = 0;
  xxx: number = 10;

  returnVhs() {
    this.notify.emit();
  }

  clearAll() {
    this.overextendedDays = 0;
    this.totalFee = 0;
  }

  calculateBaseFee() {
    if (!this.base) {
      this.totalFee += (this.baseFee * this.currentRent.rentDays);
    }
    if (this.base) {
      this.totalFee -= (this.baseFee * this.currentRent.rentDays);
    }
  }

  calculateRewindFee() {
    if (!this.notRewinded) {
      this.totalFee += this.notRewindedFee;
    }
    if (this.notRewinded) {
      this.totalFee -= this.notRewindedFee;
    }
  }

  calculateLostFee() {
    if (!this.lostVhs) {
      this.totalFee += this.lostVhsFee;
    }
    if (this.lostVhs) {
      this.totalFee -= this.lostVhsFee;
    }
  }

  calculateOverextentionFee() {
    if (!this.overextendedReturn) {
      this.totalFee += (this.overextendedReturnFee * this.overextendedDays);
    }
    if (this.overextendedReturn) {
      this.totalFee -= (this.overextendedReturnFee * this.overextendedDays);
    }
  }

  calculateOverextendedDays() {
    let currentDateInMilli = new Date().getTime();
    let rentedDateInMilli = Number(this.currentRent.rentalStartDate);
    this.xxx = this.currentRent.rentDays;
    let overextention = (Math.floor( ((currentDateInMilli - rentedDateInMilli) / 86400000) ) - this.currentRent.rentDays);

    if (overextention > 0) {
      this.overextendedDays = overextention;
    } else {
      this.overextendedDays = 0;
    }
  }

  ngOnInit() {
    this.calculateOverextendedDays();
  }
}

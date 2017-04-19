import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Vhs} from '../../model/vhs';
import {Rent} from '../../model/rent';
@Component({
  selector: 'detailsVhs-selector',
  templateUrl: './../../templates/modalsTemplates/detailsVhs.html'
})
export class DetailsVhsComponent {
  @Input() currentMovie = new Vhs(0, 0, '', '', '', '', '', 0, '', null, true);
  @Output() rentMovie = new EventEmitter<Rent>();
  rental: Rent = new Rent(null, null, null);
  hideForm: boolean = true;
  hideDetails: boolean = false;
  rented: boolean = false;

  onRent() {
    this.hideForm = false;
    this.hideDetails = true;
  }

  doRent() {
    this.rental.vhs = this.currentMovie;
    this.rentMovie.emit(this.rental);
    this.hideForm = true;
    this.rented = true;
  }

  clearAll() {
    this.hideForm = true;
    this.hideDetails = false;
    this.rented = false;
  }


}

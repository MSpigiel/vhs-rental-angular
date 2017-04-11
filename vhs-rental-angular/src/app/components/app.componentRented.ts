import {Component, OnInit} from '@angular/core';
import {RentedMoviesService} from '../services/rentedMovies.service';
import {RentInfo} from '../model/rentInfo';
import {ReturnVhsComponent} from './modals/returnVhsModal.component';

@Component({
  selector: 'my-app',
  styleUrls: ['./../../styles.css'],
  providers: [RentedMoviesService],
  templateUrl: './../templates/rentedMovies.html',
  entryComponents: [ReturnVhsComponent]
})
export class AppComponentRented implements OnInit  {
  allRentals: RentInfo[] = [];
  currentRent = new RentInfo(null, null, null, null);

  constructor (private service: RentedMoviesService) {
  }

  onSelect(rent: RentInfo) {
    this.currentRent = rent;
  }

  returnVhs() {
    this.service.returnVhs(this.currentRent).subscribe(
      data => this.allRentals = data,
      error => this.allRentals = []);
  }

  ngOnInit() {
    this.service.getRentedMovies().subscribe(
      data => this.allRentals = data,
      error => this.allRentals = []);
  }
}

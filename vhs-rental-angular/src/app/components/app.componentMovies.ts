import {Component, OnInit} from '@angular/core';
import { AvailableMoviesService } from '../services/availableMovies.service';
import {Vhs} from '../model/vhs';
import {Rent} from '../model/rent';

@Component({
  styleUrls: ['./../../styles.css'],
  selector: 'my-app',
  providers: [ AvailableMoviesService ],
  templateUrl: './../templates/moviesList.html'
})

export class AppComponentMovies implements OnInit {

  dateSortingCounter: number = 0;
  titleSortingCounter: number = 0;
  ratingSortingCounter: number = 0;
  movies: Vhs[] = [];
  currentMovie = new Vhs(0, 0, '', '', '', '', '', 0, '', 0, true);

  constructor (private service: AvailableMoviesService) {
  }

  editMovie(vhs: Vhs) {
    this.service.editMovie(vhs).subscribe(
      data => this.currentMovie = data,
      error => this.currentMovie = this.currentMovie);
  }

  deleteMovie() {
    this.service.deleteMovie(this.currentMovie).subscribe(
      data => this.currentMovie = new Vhs(0, 0, '', '', '', '', '', 0, '', null, true),
      error => this.currentMovie = this.currentMovie);
    this.movies.splice(this.movies.indexOf(this.currentMovie), 1);
  }

  createNewMovie(newMovie: Vhs) {
    this.service.createMovie(newMovie).subscribe(
      data => this.movies = data,
      error => this.movies = []);
  }

  onSelect(vhs: Vhs): void {
    this.currentMovie = vhs;
  }

  sortByTitle(): void {
    this.titleSortingCounter++;
      this.movies.sort((a, b) => {
        if (this.titleSortingCounter % 2 === 1) {
          if (a.title < b.title) {return -1; }
          if (a.title > b.title) {return  1; }
        } else {
          if (a.title > b.title) {return -1; }
          if (a.title < b.title) {return  1; }
        }
        return 0;
      });
  }

  sortByDate(): void {
    this.dateSortingCounter++;
      this.movies.sort((a, b) => {
        if (this.dateSortingCounter % 2 === 1) {
          if (a.productionDate > b.productionDate) {return -1; }
          if (a.productionDate < b.productionDate) {return  1; }
        } else {
          if (a.productionDate < b.productionDate) {return -1; }
          if (a.productionDate > b.productionDate) {return  1; }
        }
        return 0;
      });
    }

  sortByRating(): void {
    this.ratingSortingCounter++;

      this.movies.sort((a, b) => {
        if (this.ratingSortingCounter % 2 === 1) {
          if (a.rating > b.rating) {return -1; }
          if (a.rating < b.rating) {return  1; }
        } else {
          if (a.rating < b.rating) {return -1; }
          if (a.rating > b.rating) {return  1; }
        }
        return 0;
      });
  }

  rentMovie(rental: Rent) {
    this.service.rentVhs(rental).subscribe(
      data => this.movies.splice(this.movies.indexOf(this.currentMovie), 1));
  }

  ngOnInit() {
    this.service.getAvailableMovies().subscribe(
      data => this.movies = data,
      error => this.movies = []);
  }
}

import {Component, Injectable, OnInit, Pipe, PipeTransform} from '@angular/core';
import { AvailableMoviesService } from '../services/availableMovies.service';
import {Vhs} from '../model/vhs';
import {Genre} from '../model/genre';
import {Rent} from '../model/rent';

@Component({
  styleUrls: ['./../../styles.css'],
  selector: 'my-app',
  providers: [AvailableMoviesService],
  templateUrl: './../templates/moviesList.html',
})

export class AppComponentMovies implements OnInit {

  dateSortingCounter: number = 0;
  titleSortingCounter: number = 0;
  ratingSortingCounter: number = 0;
  movies: Vhs[] = [];
  genres: Genre[] = [];
  rental: Rent = new Rent(null, null, null);
  currentMovie = new Vhs(0, 0, '', '', '', '', '', 0, '', 0, true);
  newMovie = new Vhs(0, 0, '', '', '', '', '', 0, '', null, true);
  submitted = false;
  edited = false;
  deleteConfirmation = false;
  deleted = false;
  rented = false;
  constructor (private service: AvailableMoviesService) {
  }

  confirmDeletion() {
    this.deleted = true;
  }

  onSubmit() {
    this.submitted = true;
  }

  clearAll() {
    this.newMovie = new Vhs(0, 0, '', '', '', '', '', 0, '', null, true);
    this.submitted = false;
    this.deleted = false;
    this.edited = false;
    this.rented = false;
    this.deleteConfirmation = false;
    this.service.getAvailableMovies().subscribe(
      data => this.movies = data,
      error => this.movies = []);
  }

  editMovie() {
    this.edited = true;
    this.service.editMovie(this.currentMovie).subscribe(
      data => this.currentMovie = data,
      error => this.currentMovie = null);
  }

  deleteMovie() {
    this.service.deleteMovie(this.currentMovie).subscribe(
      data => this.currentMovie = new Vhs(0, 0, '', '', '', '', '', 0, '', null, true),
      error => this.currentMovie = this.currentMovie);
  }

  createNewMovie() {
    this.service.createMovie(this.newMovie).subscribe(
      data => this.movies = data,
      error => this.movies = []);
  }

  onSelect(vhs: Vhs): void {
    this.currentMovie = vhs;
  }

  onRent() {
    this.edited = true;
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

  rentVhs() {
    this.rental.vhs = this.currentMovie;
    this.edited = false;
    this.rented = true;
    this.service.rentVhs(this.rental).subscribe(
      data => this.rental = data,
      error => this.rental = new Rent(null, null, null));
  }

  ngOnInit() {
    this.service.getAllGenres().subscribe(
      data => this.genres = data,
      error => this.movies = []);
    this.service.getAvailableMovies().subscribe(
      data => this.movies = data,
      error => this.movies = []);
  }
}

@Pipe({
  name: 'myfilter',
  pure: false
})
@Injectable()
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], args: any): any {
    if (args === undefined) { return items; }
    return items.filter(item => item.title.toLowerCase().includes(args));
  }
}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Vhs} from '../../model/vhs';
import {Genre} from '../../model/genre';
import {AvailableMoviesService} from '../../services/availableMovies.service';

@Component({
  selector: 'addVhs-selector',
  templateUrl: './../../templates/modalsTemplates/addVhs.html'
})
export class AddVhsComponent implements OnInit {
  @Output() createNewMovie = new EventEmitter<Vhs>();

  genres: Genre[] = [];
  newMovie = new Vhs(0, 0, '', '', '', '', '', 0, '', null, true);
  submitted: boolean = false;
  constructor (private service: AvailableMoviesService) {
  }

  createMovie(movie: Vhs) {
    this.submitted = true;
    this.createNewMovie.emit(movie);
  }

  clearAll() {
    this.newMovie = new Vhs(0, 0, '', '', '', '', '', 0, '' , null, true);
    this.submitted = false;
  }

  ngOnInit() {
    this.service.getAllGenres().subscribe(
      data => this.genres = data,
      error => this.genres = []);
  }
}

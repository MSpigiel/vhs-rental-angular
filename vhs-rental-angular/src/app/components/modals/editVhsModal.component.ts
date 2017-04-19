import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Vhs} from '../../model/vhs';
import {Genre} from '../../model/genre';
import {AvailableMoviesService} from '../../services/availableMovies.service';

@Component({
  selector: 'editVhs-selector',
  templateUrl: './../../templates/modalsTemplates/editVhs.html'
})
export class EditVhsComponent implements DoCheck, OnInit {
  @Output() editMovie = new EventEmitter<Vhs>();
  @Output() deleteMovie = new EventEmitter<Vhs>();
  @Input() currentMovie = new Vhs(0, 0, '', '', '', '', '', 0, '', null, true);
  genres: Genre[] = [];
  vhsToEdit = new Vhs(0, 0, '', '', '', '', '', 0, '', null, true);
  edited: boolean = false;
  deleted: boolean = false;
  hideForm: boolean = false;
  deleteConfirmation: boolean = false;

  constructor (private service: AvailableMoviesService) {
  }

  doEdit(vhs: Vhs) {
    this.editMovie.emit(vhs);
    this.copyVhs(this.currentMovie, this.vhsToEdit);
    this.edited = true;
    this.hideForm = true;
  }

  doDelete(vhs: Vhs) {
    this.deleteMovie.emit(vhs);
    this.deleted = true;
    this.edited = false;
    this.hideForm = true;
  }

  clearAll() {
    this.copyVhs(this.vhsToEdit, this.currentMovie);
    this.edited = false;
    this.deleted = false;
    this.hideForm = false;
    this.deleteConfirmation = false;
  }

  copyVhs(oldVhs: Vhs, newVhs: Vhs) {
    oldVhs.id = newVhs.id;
    oldVhs.modificationCounter = newVhs.modificationCounter;
    oldVhs.title = newVhs.title;
    oldVhs.director = newVhs.director;
    oldVhs.productionDate = newVhs.productionDate;
    oldVhs.productionCountry = newVhs.productionCountry;
    oldVhs.duration = newVhs.duration;
    oldVhs.genre = newVhs.genre;
    oldVhs.posterUrl = newVhs.posterUrl;
    oldVhs.rating = newVhs.rating;
    oldVhs.available = newVhs.available;
  }

  ngDoCheck() {
    if (this.currentMovie.id !== this.vhsToEdit.id) {
      this.copyVhs(this.vhsToEdit, this.currentMovie);
    }
  }

  ngOnInit() {
    this.service.getAllGenres().subscribe(
      data => this.genres = data,
      error => this.genres = []);
  }

}

import {AddVhsComponent} from '../components/modals/addVhsModal.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserModule, By}              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AvailableMoviesService} from '../services/availableMovies.service';
import {Observable} from 'rxjs/Rx';
import {Vhs} from '../model/vhs';
import {AppComponentMovies} from '../components/app.componentMovies';
import {MyFilterPipe} from '../FilterPipe';
import {EditVhsComponent} from '../components/modals/editVhsModal.component';
import {DetailsVhsComponent} from '../components/modals/detailsVhsModal.component';
import {Rent} from "../model/rent";

describe('AppComponentMovies', function() {

  let spy: jasmine.Spy;
  let rentSpy: jasmine.Spy;
  let comp:    AppComponentMovies;
  let fixture: ComponentFixture<AppComponentMovies>;
  let de:      DebugElement[];
  let service: AvailableMoviesService;

  const movies = [new Vhs(3, 0, 'Se7en', 'David Fincher', 'Thriller', 'USA', '2001', 3, 'http://url', 100, true),
    new Vhs(1, 0, 'Forrest Gump', 'Robert Zemeckis', 'Comedy', 'USA', '1994', 5, 'http://url', 140, true),
    new Vhs(2, 0, 'Pulp Fiction', 'Quentin Tarantino', 'Crime', 'USA', '1999', 4, 'http://url', 120, true)];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpModule, FormsModule, RouterTestingModule],
      declarations: [ AppComponentMovies, MyFilterPipe, AddVhsComponent, EditVhsComponent, DetailsVhsComponent ], // declare the test component
      providers: [AvailableMoviesService]
    })
      .overrideComponent(AppComponentMovies, {
        set: {
          templateUrl: '/base/src/app/templates/moviesList.html',
          styleUrls: ['/base/src/styles.css'],
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponentMovies);
    comp = fixture.componentInstance; // AddVhsComponent test instance
    service = fixture.debugElement.injector.get(AvailableMoviesService);
    de = fixture.debugElement.queryAll(By.css('.sort'));
    spy = spyOn(service, 'getAvailableMovies').and.returnValue(Observable.of(movies));
    fixture.detectChanges();
  });

  it('should create  add vhs component', () => {
    expect(comp).toBeDefined();
  });

  it('should sort movies list by title from a to z', () => {
    // given
    // when
    de[0].triggerEventHandler('click', null);
    // then
    expect(comp.movies[0].title).toEqual('Forrest Gump');
    expect(comp.movies[1].title).toEqual('Pulp Fiction');
    expect(comp.movies[2].title).toEqual('Se7en');
  });

  it('should sort movies list by title from z to a', () => {
    // given
    // when
    de[0].triggerEventHandler('click', null);
    de[0].triggerEventHandler('click', null);
    // then
    expect(comp.movies[0].title).toEqual('Se7en');
    expect(comp.movies[1].title).toEqual('Pulp Fiction');
    expect(comp.movies[2].title).toEqual('Forrest Gump');
  });

  it('should sort movies list by date descending', () => {
    // given
    // when
    de[1].triggerEventHandler('click', null);
    // then
    expect(comp.movies[0].productionDate).toEqual('2001');
    expect(comp.movies[1].productionDate).toEqual('1999');
    expect(comp.movies[2].productionDate).toEqual('1994');
  });

  it('should sort movies list by date asccending', () => {
    // given
    // when
    de[1].triggerEventHandler('click', null);
    de[1].triggerEventHandler('click', null);
    // then
    expect(comp.movies[0].productionDate).toEqual('1994');
    expect(comp.movies[1].productionDate).toEqual('1999');
    expect(comp.movies[2].productionDate).toEqual('2001');
  });

  it('should rent movies and delete it from available movies list', () => {
    // given
    let rent = new Rent(comp.movies[0], 12345689, 3);
    rentSpy = spyOn(service, 'rentVhs').and.returnValue(Observable.of(rent));
    comp.currentMovie = comp.movies[0];
    let moviesCount = comp.movies.length;
    // when
    comp.rentMovie(rent);
    // then
    expect(comp.movies.length).toEqual(moviesCount - 1);
  });

});

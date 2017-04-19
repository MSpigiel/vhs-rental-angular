import {AddVhsComponent} from '../components/modals/addVhsModal.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserModule, By}              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AvailableMoviesService} from '../services/availableMovies.service';
import {Observable} from 'rxjs/Rx';
import {Genre} from '../model/genre';
import {Vhs} from '../model/vhs';

describe('AddVhsComponent', function() {

  let spy: jasmine.Spy;
  let comp:    AddVhsComponent;
  let fixture: ComponentFixture<AddVhsComponent>;
  let de:      DebugElement;
  let service: AvailableMoviesService;
  let expectedVhs: Vhs;

  const genres = [new Genre(1, 0, 'Horror'), new Genre(2, 0, 'Drama'), new Genre(3, 0, 'Comedy')];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpModule, FormsModule, RouterTestingModule],
      declarations: [ AddVhsComponent ], // declare the test component
      providers: [AvailableMoviesService]
    })
      .overrideComponent(AddVhsComponent, {
        set: {
          templateUrl: '/base/src/app/templates/modalsTemplates/addVhs.html',
          styleUrls: ['/base/src/styles.css'],
        }
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AddVhsComponent);
      comp = fixture.componentInstance; // AddVhsComponent test instance
      de = fixture.debugElement.query(By.css('.addVhsButton'));
      service = fixture.debugElement.injector.get(AvailableMoviesService);
      spy = spyOn(service, 'getAllGenres').and.returnValue(Observable.of(genres));
      expectedVhs = new Vhs(1, 0, 'title', 'director', 'Horror', 'pCountry', '1999', 5, 'http://url', 100, true);
      comp.newMovie = expectedVhs;
    });

    it('should create  add vhs component', () => {
      expect(comp).toBeDefined();
    });

    it('should show genres list as empty before OnInit', () => {
      expect(comp.genres.length).toEqual(0);
    });

    it('should initialize genres list after OnInit', () => {
      fixture.detectChanges();
      expect(comp.genres.length).toEqual(3);
    });

    it('should emit createNewMovie with vhs object', () => {
      fixture.detectChanges();
      let newVhs: Vhs;
      comp.createNewMovie.subscribe((vhs: Vhs) => newVhs = vhs);
      de.triggerEventHandler('click', null);
      expect(newVhs).toBe(expectedVhs);
    });

});

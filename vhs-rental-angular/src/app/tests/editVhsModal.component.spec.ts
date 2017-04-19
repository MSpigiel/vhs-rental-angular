import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserModule, By}              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {EditVhsComponent} from '../components/modals/editVhsModal.component';
import {AvailableMoviesService} from '../services/availableMovies.service';
import {Observable} from 'rxjs/Rx';
import {Genre} from '../model/genre';
import {Vhs} from '../model/vhs';
describe('EditVhsComponent', function() {

  let spy: jasmine.Spy;
  let comp:    EditVhsComponent;
  let fixture: ComponentFixture<EditVhsComponent>;
  let de:      DebugElement[];
  let service: AvailableMoviesService;

  let expectedVhs: Vhs;

  const genres = [new Genre(1, 0, 'Horror'), new Genre(2, 0, 'Drama'), new Genre(3, 0, 'Comedy')];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpModule, FormsModule, RouterTestingModule],
      declarations: [ EditVhsComponent ], // declare the test component
      providers: [AvailableMoviesService]
    })
      .overrideComponent(EditVhsComponent, {
        set: {
          templateUrl: '/base/src/app/templates/modalsTemplates/editVhs.html',
          styleUrls: ['/base/src/styles.css'],
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVhsComponent);
    comp = fixture.componentInstance; // AddVhsComponent test instance
    de = fixture.debugElement.queryAll(By.css('.detailsDisplay'));
    service = fixture.debugElement.injector.get(AvailableMoviesService);
    spy = spyOn(service, 'getAllGenres').and.returnValue(Observable.of(genres));
    expectedVhs = new Vhs(1, 0, 'title', 'director', 'Horror', 'pCountry', '1999', 5, 'http://url', 100, true);
    comp.currentMovie = expectedVhs;
  });

  it('should create  add vhs component', () => {
    expect(comp).toBeDefined();
  });

  it('should correctly copy all properites of an object', () => {
    let oldVhs = new Vhs(0, 0, '', '', '', '', '', 0, '', null, true);
    comp.copyVhs(oldVhs, expectedVhs);
    expect(oldVhs).toEqual(expectedVhs);
    expect(oldVhs).not.toBe(expectedVhs);
  });

  it('should show vhsToEdit as empty before DoCheck detects incoming movie to edit', () => {
    expect(comp.vhsToEdit.id).toEqual(0);
  });

  it('should update vhsToEdit with data from currently chosen movie', () => {
    fixture.detectChanges();
    expect(comp.vhsToEdit.id).toEqual(1);
  });

});

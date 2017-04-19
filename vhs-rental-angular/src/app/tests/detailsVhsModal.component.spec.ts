import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserModule, By}              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {DetailsVhsComponent} from '../components/modals/detailsVhsModal.component';
import {Vhs} from '../model/vhs';
import {Rent} from '../model/rent';

describe('DetailsVhsComponent', function() {

  let comp:    DetailsVhsComponent;
  let fixture: ComponentFixture<DetailsVhsComponent>;
  let de:      DebugElement[];
  let expectedVhs: Vhs;
  let expectedRent: Rent;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpModule, FormsModule, RouterTestingModule],
      declarations: [ DetailsVhsComponent ], // declare the test component
    })
      .overrideComponent(DetailsVhsComponent, {
        set: {
          templateUrl: '/base/src/app/templates/modalsTemplates/detailsVhs.html',
          styleUrls: ['/base/src/styles.css'],
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVhsComponent);
    comp = fixture.componentInstance; // AddVhsComponent test instance
    expectedVhs = new Vhs(1, 0, 'Birdman', 'Gonzalez Inarritu', 'Drama', 'USA', '2016', 5, 'http://url', 100, true);
    expectedRent = new Rent(expectedVhs, 192312921, 5);
    comp.currentMovie = expectedVhs;
    comp.rental = expectedRent;
    de = fixture.debugElement.queryAll(By.css('.detailsDisplay'));

    fixture.detectChanges();
    // spy = spyOn(service, 'getAllGenres').and.returnValue(Observable.of(genres));
  });

  it('should create  add vhs component', () => {
    expect(comp).toBeDefined();
  });

  it('should display correct details about currently selected movie', () => {
    expect(de[0].nativeElement.innerHTML).toContain(expectedVhs.director);
    expect(de[1].nativeElement.innerHTML).toContain(expectedVhs.genre);
    expect(de[2].nativeElement.innerHTML).toContain(expectedVhs.productionCountry);
    expect(de[3].nativeElement.innerHTML).toContain(expectedVhs.productionDate);
    expect(de[4].nativeElement.innerHTML).toContain(expectedVhs.duration);
    expect(de[5].nativeElement.innerHTML).toContain(expectedVhs.rating);
  });

  it('should emit rentMovie with rent object', () => {
    fixture.detectChanges();
    let newRent: Rent;
    comp.rentMovie.subscribe((rent: Rent) => newRent = rent);
    comp.doRent();
    expect(newRent).toBe(expectedRent);
  });

});

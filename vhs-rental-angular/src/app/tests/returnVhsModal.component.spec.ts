import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserModule, By}              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ReturnVhsComponent} from '../components/modals/returnVhsModal.component';
import {AvailableMoviesService} from '../services/availableMovies.service';
import {RentInfo} from '../model/rentInfo';
import {Vhs} from '../model/vhs';
describe('ReturnVhsComponent', function() {

  let comp:    ReturnVhsComponent;
  let fixture: ComponentFixture<ReturnVhsComponent>;
  let de:      DebugElement;
  let modalClose:  DebugElement;
  let expectedRent: RentInfo;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpModule, FormsModule, RouterTestingModule],
      declarations: [ ReturnVhsComponent ], // declare the test component
      providers: [AvailableMoviesService]
    })
      .overrideComponent(ReturnVhsComponent, {
        set: {
          templateUrl: '/base/src/app/templates/modalsTemplates/returnVhs.html',
          styleUrls: ['/base/src/styles.css'],
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnVhsComponent);
    comp = fixture.componentInstance; // AddVhsComponent test instance
    de = fixture.debugElement.query(By.css('.totalFee'));
    modalClose = fixture.debugElement.query(By.css('.closeModal'));
    let rentDate = String(new Date().getTime() - 259200000);
    expectedRent = new RentInfo(new Vhs(1, 0, 'title', 'director', 'Horror', 'pCountry', '1999', 5, 'http://url', 100, true),
      123456789, rentDate, 1);
    comp.currentRent = expectedRent;
  });

  it('should create  add vhs component', () => {
    expect(comp).toBeDefined();
  });

  it('should calculate number of overextended days after detection of currentRent change', () => {
    fixture.detectChanges();
    expect(comp.overextendedDays).toEqual(2);
  });

  it('should calculate total return fee', () => {
    // given
    comp.lostVhs = false;
    comp.base = false;
    comp.notRewinded = false;
    comp.overextendedReturn = false;
    fixture.detectChanges();
    // when
    comp.calculateBaseFee();
    comp.calculateLostFee();
    comp.calculateOverextentionFee();
    comp.calculateRewindFee();
    fixture.detectChanges();

    // then
    expect(comp.totalFee).toEqual(80);
    expect(de.nativeElement.innerHTML).toContain(80);
  });

  it('should clear all properties on modal close', () => {
    // given
    comp.lostVhs = true;
    comp.base = true;
    comp.notRewinded = true;
    comp.overextendedReturn = true;
    comp.totalFee = 80;
    fixture.detectChanges();
    // when
    modalClose.triggerEventHandler('click', null);
    fixture.detectChanges();

    // then
    expect(comp.lostVhs).toEqual(false);
    expect(comp.base).toEqual(false);
    expect(comp.notRewinded).toEqual(false);
    expect(comp.overextendedReturn).toEqual(false);
    expect(de.nativeElement.innerHTML).toContain(0);
  });

});

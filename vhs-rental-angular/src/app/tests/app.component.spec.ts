import { AppComponent } from '../components/app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserModule, By}           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {RouterLinkStubDirective, RouterOutletStubComponent} from './router-stubs';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

describe('AppComponent', function () {
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpModule, FormsModule, RouterTestingModule],
      declarations: [AppComponent, RouterLinkStubDirective, RouterOutletStubComponent]
    })
      .overrideComponent(AppComponent, {
        set: {
          templateUrl: '/base/src/app/templates/mainView.html',
          styleUrls: ['/base/src/styles.css'],
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    // trigger initial data binding
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    // get the attached link directive instances using the DebugElement injectors
    links = linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(2, 'should have 3 links');
    expect(links[0].linkParams).toContain('/moviesList');
    expect(links[1].linkParams).toContain('/rentedMovies');
  });



});

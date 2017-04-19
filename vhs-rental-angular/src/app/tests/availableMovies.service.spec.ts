import {AvailableMoviesService} from '../services/availableMovies.service';
import {Http, Headers, RequestOptions, HttpModule, XHRBackend, Response, ResponseOptions}          from '@angular/http';
import {inject, TestBed} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {Genre} from "../model/genre";

describe('AvailableMoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ AvailableMoviesService, MockBackend,
        { provide: XHRBackend, useClass: MockBackend }, ]
    });
  });

  describe('methods test with mocked backend', () => {
    it('should return available movies as list wrapped by observable',
      inject ([AvailableMoviesService, MockBackend], (service: AvailableMoviesService, mockBackend: MockBackend) => {
      const mockResponse = {
        data: [
          {id: 1, modificationCounter: 0, title: 'title', director: 'director', Genre: 'Horror', productionCountry: 'pCountry',
            productionYear: '1999', rating: 5, posterUrl: 'http://url', duration: 100, available: true},
          {id: 2, modificationCounter: 0, title: 'title2', director: 'director2', Genre: 'Horror', productionCountry: 'pCountry',
            productionYear: '1999', rating: 5, posterUrl: 'http://url', duration: 100, available: true}
        ]};
      mockBackend.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.getAvailableMovies().subscribe((data) => {
        expect(data.length).toBe(2);
        expect(data[0].title).toEqual('title');
        expect(data[1].title).toEqual('title2');
      });
        }));

    it('should return genres list wrapped by observable',
      inject ([AvailableMoviesService, MockBackend], (service: AvailableMoviesService, mockBackend: MockBackend) => {
        const mockResponse = {
          data: [
            {id: 1, modificationCounter: 0, genreName: 'Horror'},{id: 2, modificationCounter: 0, genreName: 'Drama'},
            {id: 3, modificationCounter: 0, genreName: 'Comedy'}
          ]};
        mockBackend.connections.subscribe((connection: any) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        service.getAllGenres().subscribe((data) => {
          expect(data.length).toBe(3);
          expect(data[0].genreName).toEqual('Horror');
          expect(data[1].genreName).toEqual('Drama');
          expect(data[2].genreName).toEqual('Comedy');
        });
      }));

  });
});

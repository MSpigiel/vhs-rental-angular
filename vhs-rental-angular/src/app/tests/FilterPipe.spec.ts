import {MyFilterPipe} from '../FilterPipe';
import {Vhs} from '../model/vhs';

describe('MyFilterPipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  let pipe = new MyFilterPipe();
  let movies = new Array();
  beforeEach(() => {
    movies = [new Vhs(3, 0, 'Forrest Gump', 'David Fincher', 'Thriller', 'USA', '2001', 3, 'http://url', 100, true),
      new Vhs(1, 0, 'Star Wars VI', 'Robert Zemeckis', 'Comedy', 'USA', '1994', 5, 'http://url', 140, true),
      new Vhs(2, 0, 'Star Wars IV', 'Quentin Tarantino', 'Crime', 'USA', '1999', 4, 'http://url', 120, true)];
  });


  it('filters movie list to contain only one movie"', () => {
    let resultArray = pipe.transform(movies, 'Forr');
    expect(resultArray.length).toEqual(1);
    expect(resultArray[0].title).toEqual('Forrest Gump');
  });

  it('filters movie list to contain two movies"', () => {
    let resultArray = pipe.transform(movies, 'Star');
    expect(resultArray.length).toEqual(2);
    expect(resultArray[0].title).toEqual('Star Wars VI');
    expect(resultArray[1].title).toEqual('Star Wars IV');
  });

});

import { showDebounce } from './show-debounce.operator';
import { TestScheduler } from 'rxjs/testing';
import { Observable } from 'rxjs';

describe('Show debounce operator', () => {
  let testScheduler: TestScheduler;

  const DEBOUNCE_TIME = 100;
  const values = { t: true, f: false };

  function getTestedObservable(source: Observable<boolean>) {
    return source.pipe(showDebounce(DEBOUNCE_TIME));
  }

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it(`emits true when source doesn't emit false before debounce time`, () => {
    testScheduler.run(({ expectObservable, cold }) => {
      // Time frames:             0 1 2  1002
      const source = cold('f t 1s f   ', values);

      // Time frames:             0 1                 101  102   1002
      const expected = `          f ${DEBOUNCE_TIME}ms t    900ms f   `;

      const testedObservable$ = getTestedObservable(source);

      expectObservable(testedObservable$).toBe(expected, values);
    });
  });

  it(`never emits true when source emits false before debounce time`, () => {
    testScheduler.run(({ expectObservable, cold }) => {
      // Time frames:             0 1 2    52
      const source = cold('f t 50ms f ', values);

      // Time frames:             0
      const expected = `          f`;

      const testedObservable$ = getTestedObservable(source);

      expectObservable(testedObservable$).toBe(expected, values);
    });
  });

  it(`never emits true when source emits multiple true values, but it emits false before debounce time`, () => {
    testScheduler.run(({ expectObservable, cold }) => {
      // Time frames:             0 1 2    52 53   100
      const source = cold('f t 50ms t  47ms f ', values);

      // Time frames:             0
      const expected = `          f`;

      const testedObservable$ = getTestedObservable(source);

      expectObservable(testedObservable$).toBe(expected, values);
    });
  });

  it(`emits true after debounce time elapsed from the first true value emitted by source`, () => {
    testScheduler.run(({ expectObservable, cold }) => {
      // Time frames:             0 1 2    52 53 1053
      const source = cold('f t 50ms t  1s f   ', values);

      // Time frames:             0 1     101 102   1053
      const expected = `          f 100ms t   951ms f   `;

      const testedObservable$ = getTestedObservable(source);

      expectObservable(testedObservable$).toBe(expected, values);
    });
  });
});

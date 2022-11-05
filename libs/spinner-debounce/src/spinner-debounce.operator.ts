import {delay, distinctUntilChanged, MonoTypeOperatorFunction, Observable, of, switchMap} from "rxjs";

export function spinnerDebounce(time = 150): MonoTypeOperatorFunction<boolean> {
  return (source: Observable<boolean>) => source.pipe(
    distinctUntilChanged(),
    switchMap((value) => {
      const valueObs = of(value);

      if (value === false) {
        return valueObs;
      }

      return valueObs.pipe(delay(time));
    }),
    distinctUntilChanged()
  );
}

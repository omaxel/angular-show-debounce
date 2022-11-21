import {
  delay,
  distinctUntilChanged,
  MonoTypeOperatorFunction,
  Observable,
  of,
  switchMap,
} from 'rxjs';

const DEFAULT_DEBOUNCE_TIME = 100;

export function showDebounce(
  time: number | null = null
): MonoTypeOperatorFunction<boolean> {
  const debounceTime = time ?? DEFAULT_DEBOUNCE_TIME;

  return (source: Observable<boolean>) =>
    source.pipe(
      distinctUntilChanged(),
      switchMap((value) => {
        const valueObs = of(value);

        if (value === false) {
          return valueObs;
        }

        return valueObs.pipe(delay(debounceTime));
      }),
      distinctUntilChanged()
    );
}

import { Component } from '@angular/core';
import { BehaviorSubject, delay, finalize, of, Subject } from 'rxjs';
import { spinnerDebounce } from '@omaxel/angular-spinner-debounce';

@Component({
  selector: 'angular-spinner-debounce-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private loadingShort = new BehaviorSubject(false);
  loadingShort$ = this.loadingShort.asObservable();

  private loadingSpinnerDebounceShort = new BehaviorSubject(false);
  loadingSpinnerDebounceShort$ = this.loadingSpinnerDebounceShort
    .asObservable()
    .pipe(spinnerDebounce());

  private loadingLong = new BehaviorSubject(false);
  loadingLong$ = this.loadingLong.asObservable();

  private loadingSpinnerDebounceLong = new BehaviorSubject(false);
  loadingSpinnerDebounceLong$ = this.loadingSpinnerDebounceLong
    .asObservable()
    .pipe(spinnerDebounce());

  private getFakeTask(duration: number, loading: Subject<boolean>) {
    loading.next(true);

    of(null)
      .pipe(
        delay(duration),
        finalize(() => loading.next(false))
      )
      .subscribe();
  }

  spinnerDebounceShortTask() {
    this.getFakeTask(100, this.loadingSpinnerDebounceShort);
  }

  shortTask() {
    this.getFakeTask(100, this.loadingShort);
  }

  spinnerDebounceLongTask() {
    this.getFakeTask(2000, this.loadingSpinnerDebounceLong);
  }

  longTask() {
    this.getFakeTask(2000, this.loadingLong);
  }
}

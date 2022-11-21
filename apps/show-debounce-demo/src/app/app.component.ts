import { Component } from '@angular/core';
import { BehaviorSubject, delay, finalize, of, Subject } from 'rxjs';

@Component({
  selector: 'angular-show-debounce-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private loadingShort = new BehaviorSubject(false);
  loadingShort$ = this.loadingShort.asObservable();

  private loadingLong = new BehaviorSubject(false);
  loadingLong$ = this.loadingLong.asObservable();

  private loadingShort2 = new BehaviorSubject(false);
  loadingShort2$ = this.loadingShort2.asObservable();

  private loadingLong2 = new BehaviorSubject(false);
  loadingLong2$ = this.loadingLong2.asObservable();

  private generateFakeTask(duration: number, loading: Subject<boolean>) {
    loading.next(true);

    of(null)
      .pipe(
        delay(duration),
        finalize(() => loading.next(false))
      )
      .subscribe();
  }

  shortTask() {
    this.generateFakeTask(100, this.loadingShort);
  }

  longTask() {
    this.generateFakeTask(2000, this.loadingLong);
  }

  shortTask2() {
    this.generateFakeTask(100, this.loadingShort2);
  }

  longTask2() {
    this.generateFakeTask(2000, this.loadingLong2);
  }
}

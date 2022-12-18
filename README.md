# Angular Show Debounce

Debounce visibility of elements. This is especially useful with spinners. Read the [Context](#context) for more information.

This is library helps you achieve this in Angular:

> Wait X milliseconds before showing this element. If I cancel the operation before, do nothing.

## Installation

```
npm i @omaxel/angular-show-debounce
```

## Usage

This library exports a directive and a RxJS operator.

### Directive

_example.component.html_

```
<div *omxDebouncedIf="loading">Loading...</div>
```

The `div` element will be shown after 100ms since `loading` is set to `true`, unless `loading` is set to `false` before 100ms.

In order to use the directive, you must import it in your module:

```
import { DebouncedIfDirective } from "@omaxel/angular-show-debounce";

@NgModule({
  imports: [BrowserModule, DebouncedIfDirective], // <-- Import the directive
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### RxJS operator

_example.component.ts_

```
import { showDebounce } from '@omaxel/angular-show-debounce';
...
loading$ = loadingSourceObservable.pipe(showDebounce());
```

The `loading$` observable will emit `true` after 100ms since `loadingSourceObservable` emits the first `true`, unless `loadingSourceObservable` emits `false` before 100ms.

## Customize debounce time

You can specify your own value for the debounce time (default = 100) for both the directive and the RxJS operator:

_Directive_

```
<div *omxDebouncedIf="loading; debounce: 150">Loading...</div>
```

_RxJS operator_

```
loading$ = loadingSourceObservable.pipe(showDebounce(150));
```

## Context

> For operations where it is unknown in advance how much work has to be done [...] use a less specific progress indicator in the form of a spinning ball, a busy bee flying over the screen, dots printed on a status line, or any such mechanism that at least indicates that the system is working, even if it does not indicate what it is doing.

[nngrop.com](https://www.nngroup.com/articles/response-times-3-important-limits/)

We surely want to display a progress indicator while the application is executing a task, for example when calling APIs. Often times, we don't have progress to display. In that case we show an undetermined progress indicator, aka _spinner_.

Allegedly, we don't know the exact amount of time for the task to be completed. For this reason we usually end up with this kind of code:

```
showSpinner();

executeTask();

hideSpinner();
```

This code is safe since the user knows something is happening.

What happens, thought, when `executeTask()` completes "almost" immediately? The user will assist to an appearing of the spinner immediately followed by its disappearing.

That's bad, don't you agree? The same article of the first quote continues:

> 0.1 second is about the limit for having the user feel that the system is reacting instantaneously, meaning that no special feedback is necessary except to display the result.

The application has 100ms to perform tasks. After that time, we must show something to the user.

The above code should now look like this:

```
showSpinnerIn100ms();

executeTask();

hideSpinnerIfItIsVisible();
```

This is conceptually easy. In Angular, the preferred way to show/hide elements is by using the `*ngIf` directive. This directive accept a boolean parameter to decide whatever to the display the element or not.
However, there's no way to delay the element rendering. You could use an observable, but then you'll need to copy the same logic in all component's observable where you want to have that feature.

This library helps you in that goal by covering both cases: a custom `*ngIf` directive and a RxJS operator.

Check the [Usage](#usage) section for more information.

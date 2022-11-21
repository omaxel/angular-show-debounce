import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DebouncedIfDirective } from '@omaxel/angular-show-debounce';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DebouncedIfDirective],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

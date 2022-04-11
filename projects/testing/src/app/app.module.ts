import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxThetellerModule } from 'ngx-theteller';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxThetellerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

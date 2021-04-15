import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LightweightShartsModule } from './lightweight-sharts/lightweight-sharts.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LightweightShartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

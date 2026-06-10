import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { FeatureModule } from './feature/feature-module'; 
import { AppRoutingModule } from './app-routing';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    FeatureModule,
    AppRoutingModule 
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
import { NgModule, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { FeatureModule } from './feature/feature-module'; 
import { AppRoutingModule } from './app-routing';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    FeatureModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }) 
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
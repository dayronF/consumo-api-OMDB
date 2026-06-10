import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MoviesListComponent } from './pages/movies-list/movies-list';
import { ApiCardComponent } from './components/api-card/api-card';

@NgModule({
  declarations: [MoviesListComponent, ApiCardComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [MoviesListComponent]  
})
export class FeatureModule {}
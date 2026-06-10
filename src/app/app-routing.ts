import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './feature/pages/movies-list/movies-list';

const routes: Routes = [
  { path: '', component: MoviesListComponent },
  { path: 'detail/:id', loadComponent: () => 
    import('./feature/pages/movie-detail/movie-detail')
    .then(m => m.MovieDetailComponent) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
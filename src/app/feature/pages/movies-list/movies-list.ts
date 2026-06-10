import { Component, OnInit } from '@angular/core';
import { ServiceModule } from '../../service/service-module';
import { OmdbResult } from '../../models/models-module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.html',
  styleUrls: ['./movies-list.scss'],
  standalone: false,
})
export class MoviesListComponent implements OnInit {
  results: OmdbResult[] = [];

  constructor(
    private omdbService: ServiceModule,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.omdbService.search('squid').subscribe({
      next: (res) => {
        if (res.Response === 'True') {
          this.results = res.Search;
        }
      },
      error: (err) => console.error('Error:', err),
    });
  }

  onCardSelected(imdbID: string): void {
    this.router.navigate(['/detail', imdbID]); 
  }
}

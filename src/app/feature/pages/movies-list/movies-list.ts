import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceModule } from '../../service/service-module';
import { OmdbResult } from '../../models/models-module';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.html',
  styleUrls: ['./movies-list.scss'],
  standalone: false
})
export class MoviesListComponent implements OnInit {
  results: OmdbResult[] = [];
  filtered: OmdbResult[] = [];

  years: string[] = [];
  types = ['Todos', 'movie', 'series', 'episode'];

  selectedYear = 'Todos';
  selectedType = 'Todos';

 
  currentPage = 1;
  totalPages = 1;

  constructor(
    private omdbService: ServiceModule,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults(): void {
    this.omdbService.search('squid', this.currentPage).subscribe({
      next: (res) => {
        if (res.Response === 'True') {
          this.results = res.Search;
          this.totalPages = Math.ceil(Number(res.totalResults) / 10);

          // Recalcular años únicos acumulando todas las páginas
          const uniqueYears = [...new Set(res.Search.map(m => m.Year))].sort();
          this.years = ['Todos', ...uniqueYears];

          this.applyFilters();
        }
      },
      error: (err) => console.error('Error:', err)
    });
  }

  applyFilters(): void {
    this.filtered = this.results.filter(movie => {
      const matchYear = this.selectedYear === 'Todos' || movie.Year === this.selectedYear;
      const matchType = this.selectedType === 'Todos' || movie.Type === this.selectedType;
      return matchYear && matchType;
    });
  }

  selectYear(year: string): void {
    this.selectedYear = year;
    this.currentPage = 1; // volver a página 1 al filtrar
    this.applyFilters();
  }

  selectType(type: string): void {
    this.selectedType = type;
    this.currentPage = 1; // volver a página 1 al filtrar
    this.applyFilters();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadResults();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadResults();
    }
  }

  onCardSelected(imdbID: string): void {
    this.router.navigate(['/detail', imdbID]);
  }
}
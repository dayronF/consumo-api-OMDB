import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceModule } from '../../service/service-module';
import { OmdbResult } from '../../models/models-module';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.html',
  styleUrls: ['./movies-list.scss'],
  standalone: false,
})
export class MoviesListComponent implements OnInit {
  readonly itemsPerPage = 7;
  readonly maxApiPages = 20; // límite para no solicitar decenas de páginas a la API

  results: OmdbResult[] = [];
  filtered: OmdbResult[] = [];

  years: string[] = [];
  types = ['Todos', 'movie', 'series', 'episode'];

  selectedYear = 'Todos';
  selectedType = 'Todos';

  currentPage = 1;
  totalPages = 1;

  constructor(private omdbService: ServiceModule, private router: Router) {}

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults(): void {
    // primero pedimos la primera página para saber cuántos resultados hay
    this.omdbService.search('squid', 1).subscribe({
      next: (res) => {
        if (res.Response === 'True') {
          const totalResults = Number(res.totalResults) || res.Search.length;
          const totalApiPages = Math.ceil(totalResults / 10);
          const pagesToFetch = Math.min(totalApiPages, this.maxApiPages);

          const requests = [];
          for (let p = 1; p <= pagesToFetch; p++) {
            requests.push(this.omdbService.search('squid', p).pipe(catchError(() => of(null))));
          }

          forkJoin(requests).subscribe({
            next: (pages) => {
              const all: OmdbResult[] = [];
              pages.forEach((page) => {
                if (page && page.Response === 'True' && Array.isArray(page.Search)) {
                  all.push(...page.Search);
                }
              });

              this.results = all;

              const uniqueYears = Array.from(new Set(this.results.map((m) => m.Year)))
                .filter((y) => y && y !== 'N/A')
                .map((y) => Number(y))
                .filter((value) => !Number.isNaN(value))
                .sort((a, b) => a - b)
                .map(String);
              this.years = ['Todos', ...uniqueYears];

              this.applyFilters();
              this.totalPages = Math.max(1, Math.ceil(this.filtered.length / this.itemsPerPage));
            },
            error: (err) => console.error('Error al obtener páginas:', err),
          });
        }
      },
      error: (err) => console.error('Error:', err),
    });
  }

  get visibleMovies(): OmdbResult[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filtered.slice(start, end);
  }

  applyFilters(): void {
    this.filtered = this.results.filter((movie) => {
      const matchYear = this.selectedYear === 'Todos' || movie.Year === this.selectedYear;
      const matchType = this.selectedType === 'Todos' || movie.Type === this.selectedType;
      return matchYear && matchType;
    });

    this.totalPages = Math.max(1, Math.ceil(this.filtered.length / this.itemsPerPage));
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  selectYear(year: string): void {
    this.selectedYear = year;
    this.selectedType = 'Todos';
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
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onCardSelected(imdbID: string): void {
    this.router.navigate(['/detail', imdbID]);
  }
}
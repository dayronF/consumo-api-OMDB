import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceModule } from '../../service/service-module';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MovieDetailComponent implements OnInit {
  detail: any = null;
  seasons: any[] = [];
  loading = true;
  loadingSeasons = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private omdbService: ServiceModule,
  ) {}

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
      // Resetear estado
      this.detail = null;
      this.seasons = [];
      this.loading = true;
      this.loadingSeasons = false;

      this.omdbService.getDetail(id).subscribe({
        next: (res) => {
          this.detail = res;
          this.loading = false;

          if (res.Type === 'series' && res.totalSeasons && res.totalSeasons !== 'N/A') {
            this.loadAllSeasons(id, Number(res.totalSeasons));
          }
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  });
}

  loadAllSeasons(imdbID: string, totalSeasons: number): void {
    this.loadingSeasons = true;

    // Crear una llamada por cada temporada
    const requests = Array.from({ length: totalSeasons }, (_, i) =>
      this.omdbService.getSeasons(imdbID, i + 1).pipe(catchError(() => of(null))),
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        this.seasons = results.filter((r) => r && r.Response === 'True');
        this.loadingSeasons = false;
      },
      error: () => {
        this.loadingSeasons = false;
      },
    });
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
goToEpisode(imdbID: string): void {
  console.log('ID:', imdbID); 
  if (imdbID && imdbID !== 'N/A') {
    this.router.navigate(['/detail', imdbID]);
  }
}
}

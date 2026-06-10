import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceModule } from '../../service/service-module';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.scss'],
  standalone: true,  // standalone para lazy load
  imports: [CommonModule]
})
export class MovieDetailComponent implements OnInit {
  detail: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private omdbService: ServiceModule
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.omdbService.getDetail(id).subscribe({
        next: (res) => {
          this.detail = res;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onImageError(event: Event): void {
  const img = event.target as HTMLImageElement;
  img.style.display = 'none'; // oculta la imagen rota
  img.parentElement!.innerHTML = '<div class="card__no-poster">Sin imagen disponible</div>';
}
}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OmdbResult } from '../../models/models-module';

@Component({
  selector: 'app-api-card',
  templateUrl: './api-card.html',
  styleUrls: ['./api-card.scss'],
  standalone: false
})
export class ApiCardComponent {
  @Input() movie!: OmdbResult;
  @Output() selected = new EventEmitter<string>();

  onSelect(): void {
    this.selected.emit(this.movie.imdbID);
  }
 onImageError(event: Event): void {
  const img = event.target as HTMLImageElement;
  img.style.display = 'none';
  const noText = img.nextElementSibling as HTMLElement;
  if (noText) noText.style.display = 'flex';
}
}
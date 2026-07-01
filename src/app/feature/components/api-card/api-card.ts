import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OmdbResult } from '../../models/models-module';

@Component({
  selector: 'app-api-card',
  templateUrl: './api-card.html',
  styleUrls: ['./api-card.scss'],
  standalone: false
})
export class ApiCardComponent {
  private _movie!: OmdbResult;

  @Input()
  set movie(value: OmdbResult) {
    this._movie = value;
    this.posterMissing = false;
  }

  get movie(): OmdbResult {
    return this._movie;
  }

  @Output() selected = new EventEmitter<string>();

  posterMissing = false;

  onSelect(): void {
    this.selected.emit(this.movie.imdbID);
  }

  onImageError(): void {
    this.posterMissing = true;
  }
}
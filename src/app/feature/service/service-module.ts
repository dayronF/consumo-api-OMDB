import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OmdbResponse } from '../models/models-module';

@Injectable({
  providedIn: 'root',
})
export class ServiceModule {
  private readonly BASE_URL = 'https://www.omdbapi.com/';
  private readonly API_KEY = '58a2d4f9';

  constructor(private http: HttpClient) {}

  getDetail(imdbID: string): Observable<any> {
    return this.http.get<any>(this.BASE_URL, {
      params: {
        i: imdbID,
        apikey: this.API_KEY,
      },
    });
  }

  getSeasons(imdbID: string, season: number): Observable<any> {
  return this.http.get<any>(this.BASE_URL, {
    params: {
      i: imdbID,
      Season: season.toString(),
      apikey: this.API_KEY
    }
  });
}

  search(query: string, page: number = 1): Observable<OmdbResponse> {
    return this.http.get<OmdbResponse>(this.BASE_URL, {
      params: {
        s: query,
        apikey: this.API_KEY,
        page: page.toString(),
      },
    });
  }
}

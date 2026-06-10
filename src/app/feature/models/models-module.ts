export interface OmdbResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OmdbResponse {
  Search: OmdbResult[];
  totalResults: string;
  Response: string;
}
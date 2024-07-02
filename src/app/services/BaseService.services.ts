import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected apiUrl: string; 
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token_here', 
    'ngrok-skip-browser-warning': 'true' 
  });

  constructor(protected http: HttpClient) {
    this.apiUrl = environment.apiUrl; 
  }

  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  protected post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  protected put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  public handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}

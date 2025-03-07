import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor() { }

  doesEmailAlreadyExist(emailAddressToCheck: string): Observable<boolean|string> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/api/users?email=${emailAddressToCheck}`).pipe(
      map((isExistingEmailAddress: boolean) => isExistingEmailAddress),
      catchError((error: HttpErrorResponse) => of(error.message))
    );
  }
}

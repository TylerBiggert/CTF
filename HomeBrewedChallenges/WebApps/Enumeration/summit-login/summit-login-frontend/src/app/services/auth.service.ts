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

  saveUserToDataseIfTheyDontExist(newUserProfileObj: {lname: string, fname: string, email: string, phone: string}): Observable<{ isExistingEmail: boolean, isError: boolean, errorMessage: string }> {
    return this.http.post<{ isExistingEmail: boolean }>(`${environment.apiBaseUrl}/users`, newUserProfileObj).pipe(
      map((res) => ({
        isExistingEmail: res.isExistingEmail,
        isError: false,
        errorMessage: ''
      })),
      catchError((error: HttpErrorResponse) => 
        of({
          isExistingEmail: false,
          isError: true,
          errorMessage: error.message
        })
      )
    );
  }
}

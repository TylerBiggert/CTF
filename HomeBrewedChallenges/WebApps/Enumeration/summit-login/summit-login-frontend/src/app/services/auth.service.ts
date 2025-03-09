import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private jwtService: JwtService = inject(JwtService);
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor() { }

  saveUserToDataseIfTheyDontExist(newUserProfileObj: {lname: string, fname: string, email: string, phone: string}): Observable<{ isExistingEmail: boolean, isError: boolean, errorMessage: string }> {
    const apiEndpoint = `${environment.apiBaseUrl}/users`;
    return this.http.post<{ isExistingEmail: boolean }>(apiEndpoint, newUserProfileObj).pipe(
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

  /**
   * TODO - someday implement the full JWT auth flow, but this should help against some cheese
   * https://blog.angular-university.io/angular-jwt-authentication/
   */
  simpleLoginNotFullBlownJwtImplementation(email: string, password: string): Observable<boolean> {
    const apiEndpoint = `${environment.apiBaseUrl}/users/login`;
    return this.http.post<{isLoginSuccessful: boolean, jwt_token: string}>(apiEndpoint, { email, password }).pipe(
      map((res: {isLoginSuccessful: boolean, jwt_token: string}) => {
        if (res.isLoginSuccessful && res.jwt_token) {
          this.jwtService.setTokenInLocalStorage(res.jwt_token);
          return true;
        }

        return false;
      }),
      catchError((error: HttpErrorResponse) => {
        return of(false);
      })
    );
  }

  getFlagText(): Observable<string> {
    // Could move logic to an HTTP Interceptor to attach the token for every request to /secured/ for larger apps
    const reqHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.jwtService.getTokenFromLocalStorage()}`);

    return this.http.get<{returnText: string}>(`${environment.apiBaseUrl}/secured/flag`, { headers: reqHeaders }).pipe(
      map((res: {returnText: string}) => res.returnText)
    );
  }
}

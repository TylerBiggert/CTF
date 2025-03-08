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

  /**
   * TODO - someday implement the full JWT auth flow
   * https://blog.angular-university.io/angular-jwt-authentication/
   */
  simpleLoginNotFullBlownJwtImplementation(email: string, password: string): Observable<boolean> {
    return this.http.post<{isLoginSuccessful: boolean, jwt_token: string}>(`${environment.apiBaseUrl}/users/login`, { email, password }).pipe(
      map((res: {isLoginSuccessful: boolean, jwt_token: string}) => {
        const jwt_token = res.jwt_token;
        if (jwt_token) {
          this.jwtService.setTokenInLocalStorage(jwt_token);
          return true;
        }

        return false;
      }),
      catchError((error: HttpErrorResponse) => {
        return of(false);
      }
      )
    );
  }

  getFlagText(): Observable<string> {
    // TODO - could move logic to an HTTP Interceptor to attach the token for every request to /secured/
    const reqHeaders = new HttpHeaders()
      .set('Authorization', `Bearer ${this.jwtService.getTokenFromLocalStorage()}`);

    return this.http.get<{returnText: string}>(`${environment.apiBaseUrl}/secured/flag`, { headers: reqHeaders }).pipe(
      map((res: {returnText: string}) => res.returnText)
    );
  }


}

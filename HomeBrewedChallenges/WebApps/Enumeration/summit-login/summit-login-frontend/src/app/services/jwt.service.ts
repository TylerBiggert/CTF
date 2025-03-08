import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private router = inject(Router);

  constructor() { }

  setTokenInLocalStorage(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  getTokenFromLocalStorage(): string {
    const tokenFromStorage = localStorage.getItem('jwt_token');

    if (tokenFromStorage && this.hasUnexpiredToken()) {
      return tokenFromStorage;
    }
    
    this.router.navigate(['/login']);
    return '';
  }
  
  hasUnexpiredToken(): boolean {
    const jwtFromUsersLocalStorage = localStorage.getItem('jwt_token');

    if (jwtFromUsersLocalStorage) {
      const jwtExpirationTimeInMS = JSON.parse(atob(jwtFromUsersLocalStorage.split('.')[1])).exp;
      const currentTimeInMS = Math.floor(Date.now() / 1000);
      
      if (currentTimeInMS <= jwtExpirationTimeInMS) {
        // JWT is present and not expired
        // Can't trust that is is a real token we issued until the backend calls
        return true;
      }
    }

    return false;
  }
}

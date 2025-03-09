import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { catchError, map, of, take } from 'rxjs';

@Component({
  selector: 'app-business-center',
  imports: [MatProgressBarModule],
  templateUrl: './business-center.component.html',
  styleUrl: './business-center.component.css'
})
export class BusinessCenterComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  flagTextToDisplay = '[FLAG REDACTED]';
  isFlagTextCallRunning: boolean = true;
  loggedInWebUserUUID: any;
  loggedInWebUserEmail: any;
  tokenExpiration: any;

  ngOnInit(): void {
    this.getFlagText();
  }

  getFlagText(): void {
    this.authService.getFlagText().pipe(take(1)).subscribe({
      next: (realFlagText: string) => {
        if (realFlagText) {
          this.flagTextToDisplay = realFlagText;
          this.setLoggedInInfo();
        }
      },
      error: (err) => {
        this.flagTextToDisplay = 'Error';
      },
      complete: () => {
        this.isFlagTextCallRunning = false;
      },
    });
  }

  setLoggedInInfo() {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        const { email, webUserUUID, exp } = payload;
        this.loggedInWebUserUUID = webUserUUID;
        this.loggedInWebUserEmail = email;
        this.tokenExpiration = exp;

        
        // Store or use email and uuid as needed
      } catch (error) {
        console.error('Invalid token:', error);
      }
    } else {
      console.warn('No JWT token found in local storage.');
    }
  }
}

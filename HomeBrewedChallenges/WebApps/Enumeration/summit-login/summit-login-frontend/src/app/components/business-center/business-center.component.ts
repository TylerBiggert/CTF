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

  ngOnInit(): void {
    this.getFlagText();
  }

  getFlagText(): void {
    this.authService.getFlagText().pipe(take(1)).subscribe({
      next: (realFlagText: string) => {
        this.flagTextToDisplay = realFlagText;
      },
      error: (err) => {
        this.flagTextToDisplay = 'Error';
      },
      complete: () => {
        this.isFlagTextCallRunning = false;
      },
    });
  }
}

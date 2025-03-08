import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { catchError, map, of } from 'rxjs';

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
    this.authService.getFlagText().subscribe({
      next: (realFlagText: string) => {
        console.log('inside next(): ' + realFlagText)
        this.flagTextToDisplay = realFlagText;
        this.isFlagTextCallRunning = false;
      },
      error: (err) => {
        console.log('getFlagTextError(): ' + err)
        this.flagTextToDisplay = 'Error';
        this.isFlagTextCallRunning = false;
      }
    });
  }
}

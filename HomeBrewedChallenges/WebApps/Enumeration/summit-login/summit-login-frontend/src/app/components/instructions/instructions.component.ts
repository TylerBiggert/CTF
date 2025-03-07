import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-instructions',
  imports: [MatCardModule, RouterLink, RouterLinkActive],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent {
  unsecureFileReader(fileName: "PASSWORD_LIST.txt"|"EMAIL_LIST.txt") {
    const link = document.createElement('a'); 
    link.href = `assets/${fileName}`; 
    link.download = fileName; 
    document.body.appendChild(link); 
    link.click(); 
    document.body.removeChild(link); 
  }
}

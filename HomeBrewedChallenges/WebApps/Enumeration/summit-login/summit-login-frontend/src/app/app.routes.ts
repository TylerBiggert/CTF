import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { BusinessCenterComponent } from './components/business-center/business-center.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: InstructionsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'secured/business-center', component: BusinessCenterComponent, canActivate: [authGuard] },
];

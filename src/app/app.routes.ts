import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RedirectLoaderComponent } from './components/redirect-loader/redirect-loader.component';

export const routes: Routes = [
   { path: '', component: RedirectLoaderComponent },
   { path: 'login', component: LoginComponent },
   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
   { path: '**', redirectTo: ''},
];

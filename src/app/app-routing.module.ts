import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { ProviderDashboardComponent } from './components/provider-dashboard/provider-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ProviderGuard } from './guards/provider.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'vehicles', 
    component: VehicleListComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  { 
    path: 'vehicles/:id', 
    component: VehicleDetailsComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  { 
    path: 'provider-dashboard', 
    component: ProviderDashboardComponent,
    canActivate: [AuthGuard, ProviderGuard]
  },
  { 
    path: 'add-vehicle', 
    component: AddVehicleComponent,
    canActivate: [AuthGuard, ProviderGuard]
  },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

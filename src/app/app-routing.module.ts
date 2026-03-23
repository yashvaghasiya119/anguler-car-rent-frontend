import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { ProviderDashboardComponent } from './components/provider-dashboard/provider-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { BookedVehiclesComponent } from './components/booked-vehicles/booked-vehicles.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminUsersManagementComponent } from './components/admin-users-management/admin-users-management.component';
import { AdminProvidersManagementComponent } from './components/admin-providers-management/admin-providers-management.component';
import { AdminVehiclesManagementComponent } from './components/admin-vehicles-management/admin-vehicles-management.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ProviderGuard } from './guards/provider.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
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
    path: 'my-bookings', 
    component: BookedVehiclesComponent,
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
  { 
    path: 'admin/users', 
    component: AdminUsersManagementComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  { 
    path: 'admin/providers', 
    component: AdminProvidersManagementComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  { 
    path: 'admin/vehicles', 
    component: AdminVehiclesManagementComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

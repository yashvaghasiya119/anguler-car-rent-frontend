import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VehicleListComponent,
    VehicleDetailsComponent,
    ProviderDashboardComponent,
    AdminDashboardComponent,
    AddVehicleComponent,
    BookedVehiclesComponent,
    HomeComponent,
    AboutUsComponent,
    ContactComponent,
    AdminUsersManagementComponent,
    AdminProvidersManagementComponent,
    AdminVehiclesManagementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    ProviderGuard,
    UserGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent implements OnInit {
  vehicles: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private vehicleService: VehicleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMyVehicles();
  }

  loadMyVehicles(): void {
    this.loading = true;
    this.vehicleService.getMyVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load your vehicles. Please try again.';
        this.loading = false;
      }
    });
  }

  addVehicle(): void {
    this.router.navigate(['/add-vehicle']);
  }

  editVehicle(vehicleId: string): void {
    // For simplicity, we'll just show an alert
    // In a real app, this would navigate to an edit page
    alert('Edit functionality would be implemented here');
  }

  deleteVehicle(vehicleId: string): void {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      this.vehicleService.deleteVehicle(vehicleId).subscribe({
        next: () => {
          this.loadMyVehicles(); // Reload the list
        },
        error: (error) => {
          alert('Failed to delete vehicle: ' + (error.error?.message || 'Unknown error'));
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  }
}

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
  showDeleteModal: boolean = false;
  vehicleToDelete: any = null;

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

  confirmDelete(vehicleId: string, vehicleModel: string): void {
    this.vehicleToDelete = { _id: vehicleId, carModel: vehicleModel };
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.vehicleToDelete = null;
  }

  executeDelete(): void {
    if (this.vehicleToDelete) {
      this.vehicleService.deleteVehicle(this.vehicleToDelete._id).subscribe({
        next: () => {
          this.loadMyVehicles(); // Reload the list
          this.closeDeleteModal();
        },
        error: (error) => {
          alert('Failed to delete vehicle: ' + (error.error?.message || 'Unknown error'));
          this.closeDeleteModal();
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

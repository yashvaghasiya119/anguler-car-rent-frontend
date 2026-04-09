import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ConfirmationService } from '../../services/confirmation.service';

@Component({
  selector: 'app-admin-vehicles-management',
  templateUrl: './admin-vehicles-management.component.html',
  styleUrls: ['./admin-vehicles-management.component.css']
})
export class AdminVehiclesManagementComponent implements OnInit {
  vehicles: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private adminService: AdminService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.loading = true;
    this.adminService.getAllVehicles().subscribe({
      next: (data: any[]) => {
        this.vehicles = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load vehicles';
        this.loading = false;
        console.error('Error loading vehicles:', err);
      }
    });
  }

  async approveVehicle(vehicleId: string): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Approve Vehicle',
      message: 'Are you sure you want to approve this vehicle?',
      confirmText: 'Approve',
      cancelText: 'Cancel',
      type: 'info'
    });

    if (result) {
      this.adminService.approveVehicle(vehicleId).subscribe({
        next: () => {
          this.loadVehicles();
        },
        error: (err: any) => {
          alert('Failed to approve vehicle');
          console.error('Error approving vehicle:', err);
        }
      });
    }
  }

  async rejectVehicle(vehicleId: string): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Reject Vehicle',
      message: 'Are you sure you want to reject this vehicle?',
      confirmText: 'Reject',
      cancelText: 'Cancel',
      type: 'warning'
    });

    if (result) {
      this.adminService.rejectVehicle(vehicleId).subscribe({
        next: () => {
          this.loadVehicles();
        },
        error: (err: any) => {
          alert('Failed to reject vehicle');
          console.error('Error rejecting vehicle:', err);
        }
      });
    }
  }

  async deleteVehicle(vehicleId: string): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Delete Vehicle',
      message: 'Are you sure you want to delete this vehicle? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger'
    });

    if (result) {
      // Note: This method needs to be added to AdminService
      alert('Delete vehicle functionality needs backend implementation');
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'approved':
        return 'badge-approved';
      case 'pending':
        return 'badge-pending';
      case 'rejected':
        return 'badge-rejected';
      default:
        return 'badge-pending';
    }
  }

  formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }
}

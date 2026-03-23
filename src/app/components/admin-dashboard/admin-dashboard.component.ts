import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  providers: any[] = [];
  vehicles: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  activeTab: string = 'vehicles';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.loading = true;
    
    this.adminService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Failed to load users:', error);
      }
    });

    this.adminService.getAllProviders().subscribe({
      next: (data) => {
        this.providers = data;
      },
      error: (error) => {
        console.error('Failed to load providers:', error);
      }
    });

    this.adminService.getAllVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load dashboard data';
        this.loading = false;
      }
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  banProvider(providerId: string): void {
    if (confirm('Are you sure you want to ban this provider?')) {
      this.adminService.banProvider(providerId).subscribe({
        next: () => {
          this.loadAllData(); // Reload data
        },
        error: (error) => {
          alert('Failed to ban provider: ' + (error.error?.message || 'Unknown error'));
        }
      });
    }
  }

  unbanProvider(providerId: string): void {
    if (confirm('Are you sure you want to unban this provider?')) {
      this.adminService.unbanProvider(providerId).subscribe({
        next: () => {
          this.loadAllData(); // Reload data
        },
        error: (error) => {
          alert('Failed to unban provider: ' + (error.error?.message || 'Unknown error'));
        }
      });
    }
  }

  approveVehicle(vehicleId: string): void {
    if (confirm('Are you sure you want to approve this vehicle?')) {
      this.adminService.approveVehicle(vehicleId).subscribe({
        next: () => {
          this.loadAllData(); // Reload data
        },
        error: (error) => {
          alert('Failed to approve vehicle: ' + (error.error?.message || 'Unknown error'));
        }
      });
    }
  }

  rejectVehicle(vehicleId: string): void {
    if (confirm('Are you sure you want to reject this vehicle?')) {
      this.adminService.rejectVehicle(vehicleId).subscribe({
        next: () => {
          this.loadAllData(); // Reload data
        },
        error: (error) => {
          alert('Failed to reject vehicle: ' + (error.error?.message || 'Unknown error'));
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

  getBannedClass(isBanned: boolean): string {
    return isBanned ? 'status-banned' : 'status-active';
  }
}

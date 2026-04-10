import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ConfirmationService } from '../../services/confirmation.service';

@Component({
  selector: 'app-admin-providers-management',
  templateUrl: './admin-providers-management.component.html',
  styleUrls: ['./admin-providers-management.component.css']
})
export class AdminProvidersManagementComponent implements OnInit {
  providers: any[] = [];
  loading = false;
  errorMessage = '';
  selectedProvider: any = null;
  showProviderModal = false;

  constructor(
    private adminService: AdminService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders(): void {
    this.loading = true;
    this.adminService.getAllProviders().subscribe({
      next: (data: any[]) => {
        this.providers = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load providers';
        this.loading = false;
        console.error('Error loading providers:', err);
      }
    });
  }

  async banProvider(providerId: string): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Ban Provider',
      message: 'Are you sure you want to ban this provider?',
      confirmText: 'Ban',
      cancelText: 'Cancel',
      type: 'warning'
    });

    if (result) {
      this.adminService.banProvider(providerId).subscribe({
        next: () => {
          this.loadProviders();
        },
        error: (err: any) => {
          alert('Failed to ban provider');
          console.error('Error banning provider:', err);
        }
      });
    }
  }

  unbanProvider(providerId: string): void {
    this.adminService.unbanProvider(providerId).subscribe({
      next: () => {
        this.loadProviders();
      },
      error: (err: any) => {
        alert('Failed to unban provider');
        console.error('Error unbanning provider:', err);
      }
    });
  }

  async deleteProvider(providerId: string): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Delete Provider',
      message: 'Are you sure you want to delete this provider? This will also delete all their vehicles. This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger'
    });

    if (result) {
      // Note: This method needs to be added to AdminService
      alert('Delete provider functionality needs backend implementation');
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getStatusClass(isBanned: boolean): string {
    return isBanned ? 'badge-banned' : 'badge-active';
  }

  viewProviderDetails(provider: any): void {
    this.selectedProvider = provider;
    this.showProviderModal = true;
  }

  closeProviderModal(): void {
    this.showProviderModal = false;
    this.selectedProvider = null;
  }
}

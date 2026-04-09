import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ConfirmationService } from '../../services/confirmation.service';

@Component({
  selector: 'app-admin-users-management',
  templateUrl: './admin-users-management.component.html',
  styleUrls: ['./admin-users-management.component.css']
})
export class AdminUsersManagementComponent implements OnInit {
  users: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private adminService: AdminService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.adminService.getAllUsers().subscribe({
      next: (data: any[]) => {
        this.users = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load users';
        this.loading = false;
        console.error('Error loading users:', err);
      }
    });
  }

  async deleteUser(userId: string): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Delete User',
      message: 'Are you sure you want to delete this user? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger'
    });

    if (result) {
      this.adminService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter(user => user._id !== userId);
        },
        error: (err: any) => {
          alert('Failed to delete user');
          console.error('Error deleting user:', err);
        }
      });
    }
  }

  async banUser(userId: string): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Ban User',
      message: 'Are you sure you want to ban this user?',
      confirmText: 'Ban',
      cancelText: 'Cancel',
      type: 'warning'
    });

    if (result) {
      this.adminService.banUser(userId).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err: any) => {
          alert('Failed to ban user');
          console.error('Error banning user:', err);
        }
      });
    }
  }

  unbanUser(userId: string): void {
    this.adminService.unbanUser(userId).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err: any) => {
        alert('Failed to unban user');
        console.error('Error unbanning user:', err);
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getRoleClass(role: string): string {
    switch (role) {
      case 'admin':
        return 'badge-admin';
      case 'provider':
        return 'badge-provider';
      case 'user':
        return 'badge-user';
      default:
        return 'badge-user';
    }
  }

  getStatusClass(isBanned: boolean): string {
    return isBanned ? 'badge-banned' : 'badge-active';
  }
}

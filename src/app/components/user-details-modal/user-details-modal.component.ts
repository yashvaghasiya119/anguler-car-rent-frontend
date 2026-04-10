import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.css']
})
export class UserDetailsModalComponent {
  @Input() user: any;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}

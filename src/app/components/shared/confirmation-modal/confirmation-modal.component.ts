import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmationData } from '../../../services/confirmation.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  isVisible: boolean = false;
  data: ConfirmationData | null = null;

  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.confirmationService.confirmation$.subscribe((data) => {
      this.data = data;
      this.isVisible = true;
    });
  }

  onConfirm(): void {
    this.isVisible = false;
    this.confirmationService.close(true);
  }

  onCancel(): void {
    this.isVisible = false;
    this.confirmationService.close(false);
  }

  onOverlayClick(): void {
    this.onCancel();
  }

  onModalClick(event: Event): void {
    event.stopPropagation();
  }

  getConfirmButtonClass(): string {
    switch (this.data?.type) {
      case 'danger':
        return 'btn-danger';
      case 'warning':
        return 'btn-warning';
      case 'info':
        return 'btn-info';
      default:
        return 'btn-danger';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { PaymentService } from '../../services/payment.service';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: any = null;
  loading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  bookingData = {
    startTime: '',
    endTime: ''
  };

  showPaymentSection: boolean = false;
  paymentLoading: boolean = false;
  paymentMethod: 'cash' | 'card' = 'cash';
  cardData = {
    bankName: '',
    cardNumber: '',
    cardHolderName: ''
  };

  showInvoiceModal: boolean = false;
  invoiceLoading: boolean = false;
  invoiceDownloading: boolean = false;
  invoiceData: any = null;
  invoiceBookingId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private paymentService: PaymentService,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');
    if (vehicleId) {
      this.loadVehicleDetails(vehicleId);
    }
  }

  loadVehicleDetails(vehicleId: string): void {
    this.loading = true;
    this.vehicleService.getVehicleById(vehicleId).subscribe({
      next: (data) => {
        this.vehicle = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load vehicle details. Please try again.';
        this.loading = false;
      }
    });
  }

  bookVehicle(): void {
    if (!this.bookingData.startTime || !this.bookingData.endTime) {
      this.errorMessage = 'Please select both start and end times';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.showPaymentSection = true;
  }

  cancelPayment(): void {
    this.showPaymentSection = false;
    this.paymentLoading = false;
  }

  payNow(): void {
    if (!this.vehicle?._id) return;

    this.errorMessage = '';
    this.successMessage = '';

    if (this.paymentMethod === 'card') {
      if (!this.cardData.bankName || !this.cardData.cardNumber || !this.cardData.cardHolderName) {
        this.errorMessage = 'Please fill all card details';
        return;
      }

      const cardDigits = String(this.cardData.cardNumber).replace(/\D/g, '');
      if (cardDigits.length !== 12) {
        this.errorMessage = 'Card number must be exactly 12 digits';
        return;
      }
    }

    const payload: any = {
      vehicleId: this.vehicle._id,
      startTime: this.bookingData.startTime,
      endTime: this.bookingData.endTime,
      method: this.paymentMethod
    };

    if (this.paymentMethod === 'card') {
      payload.bankName = this.cardData.bankName;
      payload.cardNumber = this.cardData.cardNumber;
      payload.cardHolderName = this.cardData.cardHolderName;
    }

    this.paymentLoading = true;
    this.paymentService.payAndBook(payload).subscribe({
      next: (response) => {
        this.paymentLoading = false;
        this.showPaymentSection = false;
        this.successMessage = 'Vehicle booked successfully';

        const bookingId = response?.booking?._id;
        if (bookingId) {
          this.openInvoice(bookingId);
        } else {
          this.router.navigate(['/vehicles']);
        }
      },
      error: (error) => {
        this.paymentLoading = false;
        this.errorMessage = error.error?.message || 'Payment failed';
      }
    });
  }

  openInvoice(bookingId: string): void {
    this.invoiceBookingId = bookingId;
    this.invoiceData = null;
    this.invoiceLoading = true;
    this.showInvoiceModal = true;

    this.invoiceService.getInvoice(bookingId).subscribe({
      next: (data) => {
        this.invoiceData = data;
        this.invoiceLoading = false;
      },
      error: (error) => {
        this.invoiceLoading = false;
        this.errorMessage = error.error?.message || 'Failed to load invoice';
      }
    });
  }

  closeInvoice(): void {
    this.showInvoiceModal = false;
    this.router.navigate(['/vehicles']);
  }

  downloadInvoicePdf(): void {
    if (!this.invoiceBookingId) return;
    this.invoiceDownloading = true;

    this.invoiceService.downloadInvoicePdf(this.invoiceBookingId).subscribe({
      next: (blob) => {
        this.invoiceDownloading = false;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        const invoiceNumber = this.invoiceData?.invoiceNumber || this.invoiceBookingId;
        a.href = url;
        a.download = `invoice-${invoiceNumber}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        this.invoiceDownloading = false;
        this.errorMessage = error.error?.message || 'Failed to download invoice PDF';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/vehicles']);
  }
}

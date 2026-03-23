import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { PaymentService } from '../../services/payment.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private paymentService: PaymentService
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
        alert('Vehicle booked successfully!');
        this.router.navigate(['/vehicles']);
      },
      error: (error) => {
        this.paymentLoading = false;
        this.errorMessage = error.error?.message || 'Payment failed';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/vehicles']);
  }
}

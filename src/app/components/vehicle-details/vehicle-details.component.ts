import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: any = null;
  loading: boolean = true;
  errorMessage: string = '';
  bookingData = {
    startTime: '',
    endTime: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private bookingService: BookingService
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

    const booking = {
      vehicleId: this.vehicle._id,
      startTime: this.bookingData.startTime,
      endTime: this.bookingData.endTime
    };

    this.bookingService.bookVehicle(booking).subscribe({
      next: (response) => {
        alert('Vehicle booked successfully!');
        this.router.navigate(['/vehicles']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to book vehicle';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/vehicles']);
  }
}

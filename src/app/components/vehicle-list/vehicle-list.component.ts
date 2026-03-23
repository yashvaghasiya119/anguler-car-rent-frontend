import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private vehicleService: VehicleService,
    private bookingService: BookingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.loading = true;
    this.vehicleService.getAllApprovedVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load vehicles. Please try again.';
        this.loading = false;
      }
    });
  }

  viewVehicleDetails(vehicleId: string): void {
    this.router.navigate(['/vehicles', vehicleId]);
  }

  bookVehicle(vehicle: any): void {
    // This would typically open a booking modal or navigate to booking page
    // For simplicity, we'll create a basic booking
    const bookingData = {
      vehicleId: vehicle._id,
      startTime: new Date(),
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    };

    this.bookingService.bookVehicle(bookingData).subscribe({
      next: (response) => {
        alert('Vehicle booked successfully!');
      },
      error: (error) => {
        alert('Failed to book vehicle: ' + (error.error?.message || 'Unknown error'));
      }
    });
  }
}

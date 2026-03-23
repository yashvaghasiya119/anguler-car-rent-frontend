import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  vehicleData = {
    vehicleNumber: '',
    carModel: '',
    rentPerHour: 0,
    ownerName: '',
    bankAccountNumber: ''
  };
  
  selectedFiles: {
    vehicleFrontImage: File | null,
    aadharCardImage: File | null
  } = {
    vehicleFrontImage: null,
    aadharCardImage: null
  };
  
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

  constructor(
    private vehicleService: VehicleService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  onFileSelect(event: any, fileType: 'vehicleFrontImage' | 'aadharCardImage'): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFiles[fileType] = file;
    }
  }

  submitVehicle(): void {
    this.errorMessage = '';
    this.successMessage = '';
    
    // Validation
    if (!this.vehicleData.vehicleNumber || !this.vehicleData.carModel || 
        !this.vehicleData.ownerName || !this.vehicleData.bankAccountNumber ||
        this.vehicleData.rentPerHour <= 0) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    if (!this.selectedFiles.vehicleFrontImage || !this.selectedFiles.aadharCardImage) {
      this.errorMessage = 'Please upload both vehicle image and Aadhar card image.';
      return;
    }

    this.loading = true;

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('vehicleNumber', this.vehicleData.vehicleNumber);
    formData.append('carModel', this.vehicleData.carModel);
    formData.append('rentPerHour', this.vehicleData.rentPerHour.toString());
    formData.append('ownerName', this.vehicleData.ownerName);
    formData.append('bankAccountNumber', this.vehicleData.bankAccountNumber);
    
    if (this.selectedFiles.vehicleFrontImage) {
      formData.append('vehicleFrontImage', this.selectedFiles.vehicleFrontImage);
    }
    
    if (this.selectedFiles.aadharCardImage) {
      formData.append('aadharCardImage', this.selectedFiles.aadharCardImage);
    }

    this.vehicleService.addVehicle(formData).subscribe({
      next: (response) => {
        this.successMessage = 'Vehicle added successfully! It will be visible after admin approval.';
        this.loading = false;
        
        // Reset form
        this.vehicleData = {
          vehicleNumber: '',
          carModel: '',
          rentPerHour: 0,
          ownerName: '',
          bankAccountNumber: ''
        };
        this.selectedFiles = {
          vehicleFrontImage: null,
          aadharCardImage: null
        };
        
        // Clear file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => (input as HTMLInputElement).value = '');
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to add vehicle. Please try again.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/provider-dashboard']);
  }
}

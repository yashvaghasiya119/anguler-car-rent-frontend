import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private API_URL = 'http://localhost:5000/api/booking';

  constructor(private http: HttpClient) { }

  bookVehicle(bookingData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/book`, bookingData);
  }

  getBookingHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/history`);
  }
}

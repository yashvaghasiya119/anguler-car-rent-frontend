import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private API_URL = 'http://localhost:5000/api/vehicle';

  constructor(private http: HttpClient) { }

  addVehicle(vehicleData: FormData): Observable<any> {
    return this.http.post(`${this.API_URL}/add`, vehicleData);
  }

  getMyVehicles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/my`);
  }

  updateVehicle(id: string, vehicleData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/update/${id}`, vehicleData);
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/delete/${id}`);
  }

  getAllApprovedVehicles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/all-approved`);
  }

  getVehicleById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }
}

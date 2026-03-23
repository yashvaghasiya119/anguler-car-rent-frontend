import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private API_URL = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/users`);
  }

  getAllProviders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/providers`);
  }

  banProvider(id: string): Observable<any> {
    return this.http.put(`${this.API_URL}/ban-provider/${id}`, {});
  }

  unbanProvider(id: string): Observable<any> {
    return this.http.put(`${this.API_URL}/unban-provider/${id}`, {});
  }

  getAllVehicles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/vehicles`);
  }

  approveVehicle(id: string): Observable<any> {
    return this.http.put(`${this.API_URL}/approve-vehicle/${id}`, {});
  }

  rejectVehicle(id: string): Observable<any> {
    return this.http.put(`${this.API_URL}/reject-vehicle/${id}`, {});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private API_URL = 'http://localhost:5000/api/payment';

  constructor(private http: HttpClient) {}

  payAndBook(payload: any): Observable<any> {
    return this.http.post(`${this.API_URL}/pay`, payload);
  }
}

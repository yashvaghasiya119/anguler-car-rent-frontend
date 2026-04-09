import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ConfirmationData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private confirmationSubject = new Subject<ConfirmationData>();
  private resultSubject = new Subject<boolean>();

  confirmation$ = this.confirmationSubject.asObservable();
  result$ = this.resultSubject.asObservable();

  confirm(data: ConfirmationData): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmationSubject.next(data);
      
      const subscription = this.result$.subscribe((result) => {
        subscription.unsubscribe();
        resolve(result);
      });
    });
  }

  close(result: boolean): void {
    this.resultSubject.next(result);
  }
}

// src/app/services/subscription.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionPlan } from '../Models/Streaming.models';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'https://localhost:7192/api'; // adjust if different

  constructor(private http: HttpClient) {}

  getAllPlans(): Observable<SubscriptionPlan[]> {
    return this.http.get<SubscriptionPlan[]>(`${this.apiUrl}/SubscriptionPlans`);
  }

  subscribeToPlan(planId: number, userId: number): Observable<any> {
    // endpoint to assign a subscription plan to a user
    return this.http.post(`${this.apiUrl}/SubscriptionPlans`, { planId, userId });
  }
}

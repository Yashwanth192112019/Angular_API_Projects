// src/app/subscription/subscription.component.ts
import { Component, OnInit } from '@angular/core';
import { SubscriptionPlan } from '../../../Models/Streaming.models';
import { SubscriptionService } from '../../../services/subscription.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-subscription',
  standalone: true,
  imports : [CommonModule, FormsModule],
  templateUrl: './subscription.html',
  styleUrls: ['./subscription.css']
})
export class SubscriptionComponent implements OnInit {
  plans: SubscriptionPlan[] = [];
  selectedPlanId: number | null = null;
  message: string = '';

  constructor(
    private subscriptionService: SubscriptionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans() {
    this.subscriptionService.getAllPlans().subscribe(plans => {
      this.plans = plans;
    });
  }

  subscribe(planId: number) {
    const token = this.authService.getToken();
    if (!token) {
      this.message = 'You must login first.';
      return;
    }

    // Decode userId from token
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload['nameid'];

    this.subscriptionService.subscribeToPlan(planId, userId).subscribe({
      next: () => this.message = 'Subscribed successfully!',
      error: () => this.message = 'Subscription failed. Try again.'
    });
  }
}

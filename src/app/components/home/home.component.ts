import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  features = [
    {
      icon: '🚗',
      title: 'Wide Selection',
      description: 'Choose from our diverse fleet of well-maintained vehicles'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive rates with no hidden fees'
    },
    {
      icon: '🔒',
      title: 'Secure Booking',
      description: 'Safe and secure online booking system'
    },
    {
      icon: '⭐',
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance'
    }
  ];

  testimonials = [
    {
      name: 'John Doe',
      role: 'Business Traveler',
      content: 'Excellent service! The booking process was smooth and the vehicle was in perfect condition.',
      rating: 5
    },
    {
      name: 'Sarah Smith',
      role: 'Tourist',
      content: 'Great experience with this car rental service. Highly recommend to anyone visiting the city!',
      rating: 5
    },
    {
      name: 'Mike Johnson',
      role: 'Local Customer',
      content: 'Best prices in town and amazing customer service. Will definitely use again!',
      rating: 5
    }
  ];
}

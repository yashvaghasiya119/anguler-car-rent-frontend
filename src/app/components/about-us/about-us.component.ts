import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  teamMembers = [
    {
      name: 'John Anderson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      description: 'Visionary leader with 15+ years in automotive industry'
    },
    {
      name: 'Sarah Williams',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=300&q=80',
      description: 'Expert in logistics and customer service excellence'
    },
    {
      name: 'Michael Chen',
      role: 'Technical Director',
      image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=300&q=80',
      description: 'Tech innovator driving digital transformation'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Customer Success Head',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
      description: 'Dedicated to exceptional customer experiences'
    }
  ];

  stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Vehicle Fleet' },
    { number: '50+', label: 'Cities Covered' },
    { number: '24/7', label: 'Support Available' }
  ];

  values = [
    {
      icon: '🎯',
      title: 'Customer First',
      description: 'We prioritize customer satisfaction above everything else'
    },
    {
      icon: '🤝',
      title: 'Integrity',
      description: 'Transparent pricing and honest business practices'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'Continuously improving our services with technology'
    },
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'Committed to eco-friendly transportation solutions'
    }
  ];
}

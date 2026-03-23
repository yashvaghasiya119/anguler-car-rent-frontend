import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      details: ['123 Main Street', 'New York, NY 10001', 'United States']
    },
    {
      icon: '📞',
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543']
    },
    {
      icon: '✉️',
      title: 'Email',
      details: ['info@vehiclerental.com', 'support@vehiclerental.com']
    },
    {
      icon: '⏰',
      title: 'Business Hours',
      details: ['Mon-Fri: 8:00 AM - 8:00 PM', 'Sat-Sun: 9:00 AM - 6:00 PM']
    }
  ];

  faqs = [
    {
      question: 'How do I book a vehicle?',
      answer: 'You can book a vehicle by browsing our available vehicles, selecting your preferred dates, and completing the online booking process.'
    },
    {
      question: 'What documents do I need to rent a vehicle?',
      answer: 'You need a valid driver\'s license, a credit card, and a form of identification (passport or national ID).'
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking up to 24 hours before the rental period for a full refund.'
    },
    {
      question: 'Is insurance included?',
      answer: 'Basic insurance is included with all rentals. Additional coverage options are available at checkout.'
    }
  ];

  onSubmit(): void {
    console.log('Contact form submitted:', this.contactForm);
    // Here you would typically send the form data to your backend
    alert('Thank you for contacting us! We will get back to you soon.');
    this.resetForm();
  }

  resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MySerService } from '../my-ser.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(public service: MySerService, private router: Router) { 
    this.restoreUserData();
  }

  restoreUserData() {
    const token = localStorage.getItem('token');
    if (token && !this.service.userData) {
      this.service.isLoading = true;
      this.service.getUserData(token).subscribe({
        next: (user) => {
          this.service.userData = user;
          this.service.isLoading = false;
        },
        error: (error) => {
          console.log('Error ', error);
          localStorage.removeItem('token');
          this.service.userData = null;
          this.service.isLoading = false;
          window.location.href = '/auth';
        }
      });
    } else if (!token) {
      window.location.href = '/auth';
    }
  }

  goBack() {
    this.router.navigate(['/home']); 
  }
}
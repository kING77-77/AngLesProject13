import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MySerService } from '../my-ser.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  public isLoginView = true;

  constructor(private service: MySerService, private router: Router) {}

  toggleView() {
    this.isLoginView = !this.isLoginView;
  }

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  public registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl(null, [Validators.required, Validators.min(1)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?[0-9]{9,15}$/)]),
    zipcode: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required]),
    gender: new FormControl('MALE', [Validators.required])
  });

  login() {
    if (this.loginForm.valid) {
      this.service.signIn(this.loginForm.value).subscribe({
        next: (data: any) => {
          localStorage.setItem('token', data.access_token);
          this.service.getUserData(data.access_token).subscribe({
            next: (user) => {
              this.service.userData = user;
              this.router.navigate(['/home']);
            },
            error: (err) => console.error('Error in taking information', err)
          });
        },
        error: (err) => console.error('Error in enter:', err)
      });
    }
  }

  register() {
    if (this.registerForm.valid) {
      let allReg = { ...this.registerForm.value };
      allReg.email = allReg.email?.toLowerCase();
      if (typeof allReg.phone === 'string' && !allReg.phone.startsWith('+')) {
        allReg.phone = '+995' + allReg.phone.replace(/^0+/, '');
      }
      this.service.signUp(allReg).subscribe({
        next: (data: any) => {
          localStorage.setItem('token', data.access_token);
          this.service.getUserData(data.access_token).subscribe({
            next: (user) => {
              this.service.userData = user;
              this.router.navigate(['/home']);
            },
            error: (err) => console.error('Error in taking information', err)
          });
        },
        error: (err) => console.error('Error in registration:', err)
      });
    }
  }
}
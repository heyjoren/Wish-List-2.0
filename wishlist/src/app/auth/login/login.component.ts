import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { user } from '../user/user.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  showPassword: boolean = false;
  user: user = new user();
  falsLoggin: boolean = false;

  constructor(private fb : FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      'credentials': this.fb.group({
        'email': [null, {
        validators: [Validators.required, Validators.email]
        }],
        'passwd': [null, {
          validators: [Validators.required, Validators.minLength(8), this.authService.passwdValidation]
        }]
      })
    });

    this.falsLoggin = false;
  }

  onSubmit(): void {
    console.log(this.form)
    this.user.email = this.form.value.credentials.email;
    this.user.passwd = this.form.value.credentials.passwd;
    console.log(this.user)
    
    this.authService.login(this.user)
    .then( (response) => {
      if (!response) {
        this.falsLoggin = true;
      }
      else {
        this.falsLoggin = false;
        this.router.navigate(['home']);
      }
    })

  }

  togglePasswordVisibility():void {
    this.showPassword = !this.showPassword;
  }
  get email() {
    const naam = this.form.controls['credentials'] as FormGroup;
    return naam.controls['email']
  }

  get passwd() {
    const naam = this.form.controls['credentials'] as FormGroup;
    return naam.controls['passwd']
  }

}

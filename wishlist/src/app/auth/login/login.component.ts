import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!: FormGroup;
  showPassword: boolean = false;
  showTooltip: boolean  = false;
  keepHover: boolean  = false;

  constructor(private fb : FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      'email': [null, {
        validators: [Validators.required, Validators.email]
      }],
      'passwd': [null, {
        validators: [Validators.required, Validators.minLength(8), this.auth.passwdValidation]
      }],
    });
  }

  onSubmit(): void {
    console.log(this.form)
    console.log("errors: " + this.form.errors)
    console.log("errors passwd: " + this.passwd.errors)
  }

  togglePasswordVisibility():void {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword)
  }
  get email() {
    return this.form.controls['email'];
  }

  get passwd() {
    return this.form.controls['passwd'];
  }

  get hasUpperCase(): boolean {
    return /[A-Z]/.test(this.passwd.value || '');
  }

  get hasLowerCase(): boolean {
    return /[a-z]/.test(this.passwd.value || '');
  }

  get hasSpecialChar(): boolean {
    return /[\W\_]/.test(this.passwd.value || '');
  }

  get hasNumber(): boolean {
    return /[\d]/.test(this.passwd.value || '');
  }
}

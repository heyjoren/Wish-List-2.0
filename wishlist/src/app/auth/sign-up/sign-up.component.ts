import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  form!: FormGroup;
  genders = ['man', 'vrouw'];
  showPassword: boolean = false;
  showTooltip: boolean  = false;
  keepHover: boolean  = false;

  constructor(private fb : FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      'naam': this.fb.group({
        'voornaam': [null, Validators.required],
        'achternaam': [null, Validators.required]
      }),
      'gender':['man'],
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

  get voornaam() {
    const naam = this.form.controls['naam'] as FormGroup;
    return naam.controls['voornaam']
  }

  get achternaam() {
    const naam = this.form.controls['naam'] as FormGroup;
    return naam.controls['achternaam']
  }

  get gender() {
    return this.form.controls['gender'];
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

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  form!: FormGroup

  constructor(private fb : FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      'email': [null, {
        validators: [Validators.required, Validators.email]
      }],
      'passwd': [null, {
        validators: [Validators.required, Validators.minLength(8), this.passwdValidation]
      }],
    });
  }

  onSubmit(): void {
    console.log(this.form)
    console.log("errors: " + this.form.errors)
    console.log("errors passwd: " + this.passwd.errors)
  }

  passwdValidation(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[\W\_]/.test(value);
    const test = /[\W]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    return !valid ? {passwordStrength: true} : null;
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

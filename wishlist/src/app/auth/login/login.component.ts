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
  // WARN als je het vraagteken na submit wilt weg halen.
  // showTooltip: boolean  = false;
  // keepHover: boolean  = false;
  // WARN tot hier

  // TEST
  falsLoggin: boolean = true;
  // TEST tot hier

  constructor(private fb : FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      'credentials': this.fb.group({
        'email': [null, {
        validators: [Validators.required, Validators.email]
      }],
      'passwd': [null, {
        validators: [Validators.required, Validators.minLength(8), this.auth.passwdValidation]
      }]
      })
    });
  }

  onSubmit(): void {
    console.log(this.form)
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

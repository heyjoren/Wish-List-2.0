import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, NgForm, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { user } from '../user/user.module';
import { PasswdRequirementsDirective } from '../../passwd-requirements.directive';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PasswdRequirementsDirective],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  form!: FormGroup;
  genders = ['man', 'vrouw'];
  showPassword: boolean = false;
  showTooltip: boolean  = false;
  keepHover: boolean  = false;
  user: user = new user();

  constructor(private fb : FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      'naam': this.fb.group({
        'voornaam': [null, Validators.required],
        'achternaam': [null, Validators.required]
      }),
      'gender':['man'],
      'email': [null, {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.emailAsyncValidator()],
        updateOn: 'change'
      }],
      'passwd': [null, {
        validators: [Validators.required, Validators.minLength(8), this.authService.passwdValidation]
      }],
    });
  }

  emailAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.authService.emailExists(control.value).then(result => {
        return result ? { emailExists: true } : null;
      });
    };
  }


  onSubmit(): void {
    this.user.voornaam = this.form.controls['naam'].value.voornaam;
    this.user.achternaam = this.form.controls['naam'].value.achternaam;
    this.user.aanspreking = this.form.value.gender;
    this.user.email = this.form.value.email;
    this.user.passwd = this.form.value.passwd;

    this.authService.signUp(this.user)
    .then((res) => {
      if(res == 'success'){
        this.router.navigate(['login']);
      }
      else {
        alert(res);
      }
    });
  }

  togglePasswordVisibility():void {
    this.showPassword = !this.showPassword;
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

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { user } from '../user/user.module';
import { Router } from '@angular/router';
import { BackendAdminService } from '../admin/backend-admin.service';
import { admin } from '../admin/admin/admin.module';
import { Subscription } from 'rxjs';

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
  adminSubscription!: Subscription;

  constructor(private fb : FormBuilder, private authService: AuthService, private router: Router, private adminService: BackendAdminService) {}

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

  /**
   * admin user:
   *    email:  joren@joren.com
   *    passwd: Joren123*
   */
  onSubmit(): void {
    this.user.email = this.form.value.credentials.email;
    this.user.passwd = this.form.value.credentials.passwd;
    
    this.authService.login(this.user)
    .then( (response) => {
      if (!response) {
        this.falsLoggin = true;
      }
      else {
        this.falsLoggin = false;
        
        this.router.navigate(['home']);
        console.log("test");

        this.adminSubscription = this.adminService.getAdmin(this.authService.getUid()).subscribe((admin) => {
          console.log("login admin: " + admin);
          if(admin)
          {
            this.adminService.checkAdmin(true);
          }
          else
          {
            this.adminService.checkAdmin(false);

          }
          this.adminSubscription.unsubscribe();
        });
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

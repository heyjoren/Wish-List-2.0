import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welkom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welkom.component.html',
  styleUrl: './welkom.component.css'
})
export class WelkomComponent {
  isLoggedIn: boolean= false

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  this.isLoggedIn = this.authService.isLoggedIn();
  }

  login(){
    this.router.navigate(['login']);
  }

  signUp(){
    this.router.navigate(['signUp']);
  }

  logout(){
    this.authService.logOut();
  }
}

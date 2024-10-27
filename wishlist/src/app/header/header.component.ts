import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { BackendAdminService } from '../auth/admin/backend-admin.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAdmin: boolean = false;

  constructor(protected authService: AuthService, protected adminService: BackendAdminService, private router: Router) { }

  Logout(){
    this.authService.logOut();
    this.adminService.checkAdmin(false);
    this.router.navigate([''])

  }

  ngOnInit()
  {
    this.isAdmin = this.adminService.getStoredAdminStatus();

    this.adminService.IsAdmin.subscribe({
      next: (value) => {
        this.isAdmin = value
      },
    })
  }
}

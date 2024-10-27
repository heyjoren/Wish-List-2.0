import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
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

  constructor(protected authService: AuthService, protected adminService: BackendAdminService) { }

  Logout(){
    this.authService.logOut();
  }

  ngOnInit()
  {
    this.adminService.getAdmin(this.authService.getUid()).subscribe((admin) => {
      console.log(this.authService.getUid());
      console.log(admin);

      if(admin)
      {
        this.isAdmin = true;
      }
      console.log(this.isAdmin);

    });
  }
}

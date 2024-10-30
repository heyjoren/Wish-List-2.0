import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackendAdminService } from '../backend-admin.service';
import { user } from '../../user/user.module';
import { admin } from '../admin/admin.module';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {

  constructor(protected adminService: BackendAdminService,  protected auth: AuthService) { }

  ngOnInit(){
    this.adminService.getAllUsersPut();

    this.adminService.getAllAdminsPutAssignRoles();
    
  }



  makeAdmin(user: user)
  {
    this.adminService.addAdmin(user);
  }

  makeUser(user: user)
  {
    let deleteAdmin: admin | null = null;

    this.adminService.admins.forEach(admin => {
      if(user.id == admin.id)
      {
        deleteAdmin = admin;
      }
    });

    this.adminService.deleteAdmin(deleteAdmin!);
  }

}

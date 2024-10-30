import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { BackendAdminService } from '../auth/admin/backend-admin.service';

@Component({
  selector: 'app-welkom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welkom.component.html',
  styleUrl: './welkom.component.css'
})
export class WelkomComponent {
  isLoggedIn: boolean= false
  Logo: string = "";

  constructor(private authService: AuthService, private router: Router, private storage : Storage, private adminService: BackendAdminService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getUid();
    this.getLogo();
  }

  getLogo() {
    const logoRef = ref(this.storage, 'logo/logo.webp');  // Vervang dit door het juiste pad naar je logo in Firebase Storage

    getDownloadURL(logoRef)
      .then((url) => {
        this.Logo = url;  // Stel de Logo-variabele in met de URL van de afbeelding
      })
      .catch((error) => {
        console.error('Error fetching logo: ', error);  // Log eventuele fouten
      });
  }



  login(){
    this.router.navigate(['login']);
  }

  signUp(){
    this.router.navigate(['signUp']);
  }

  logout(){
    this.authService.logOut();
    this.adminService.checkAdmin(false);
    this.isLoggedIn = false;
    this.router.navigate([''])
  }
}

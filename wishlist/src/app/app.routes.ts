import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BedragComponent } from './bedrag/bedrag.component';
import { ItemComponentComponent } from './item-component/item-component.component';
import { NewBedragComponent } from './bedrag/new-bedrag/new-bedrag.component';
import { ItemDetailComponent } from './item-component/item-detail/item-detail.component';
import { AanpasItemComponent } from './item-component/aanpas-item/aanpas-item.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { WelkomComponent } from './welkom/welkom.component';
import { adminGaurd, deactivateGaurd, isLoggedInGaurd, loggedInChildGuard, loggedInGaurd } from './auth/route-access.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminUsersComponent } from './auth/admin/admin-users/admin-users.component';

export const routes: Routes = [

    {path: '', component: WelkomComponent },

    {path: 'home', component: HomeComponent,canActivate: [loggedInGaurd] },

    {path: 'bedragen', component: BedragComponent, canActivate: [loggedInGaurd], canActivateChild: [loggedInChildGuard], children: [
        {path: 'add', component: NewBedragComponent }
    ]},

    {path: 'items', component: ItemComponentComponent, canActivate: [loggedInGaurd], canActivateChild: [loggedInChildGuard], children: [
        {path: ':id', component: ItemDetailComponent, data: { showKoopButton: true } },
    ]},

    {path: 'items/:id/change', component: AanpasItemComponent, canActivate: [loggedInGaurd], canActivateChild: [loggedInChildGuard] , canDeactivate: [deactivateGaurd], children: [
        {path: '', component: ItemDetailComponent, data: { showKoopButton: false } },
    ]},
    {path: 'signUp', component: SignUpComponent, canActivate: [isLoggedInGaurd] },
    {path: 'login', component: LoginComponent, canActivate: [isLoggedInGaurd] },

    {path: 'users', component: AdminUsersComponent, canActivate: [adminGaurd] },

    
    { path: '**', component: NotFoundComponent }

];

import { Routes } from '@angular/router';
import { ItemDetailComponent } from './item-component/item-detail/item-detail.component';
import { AanpasItemComponent } from './item-component/aanpas-item/aanpas-item.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { WelkomComponent } from './welkom/welkom.component';
import { adminGaurd, deactivateGaurd, isLoggedInGaurd, loggedInChildGuard, loggedInGaurd, loggedInLoadGaurd } from './auth/route-access.guard';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [

    {path: '', component: WelkomComponent },

    {path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) ,canActivate: [loggedInGaurd] },

    {path: 'bedragen', canMatch: [loggedInLoadGaurd], loadChildren: () => import('./bedrag/bedrag.routes').then(m => m.bedragRoutes)},


    {path: 'items', canMatch: [loggedInLoadGaurd], loadChildren: () => import('./item-component/item.routes').then(m => m.itemRoutes)},

    // {path: 'items/:id/change', component: AanpasItemComponent, canActivate: [loggedInGaurd], canActivateChild: [loggedInChildGuard] , canDeactivate: [deactivateGaurd], children: [
    //     {path: '', component: ItemDetailComponent, data: { showKoopButton: false } },
    // ]},


    {path: 'signUp', component: SignUpComponent, canActivate: [isLoggedInGaurd] },
    {path: 'login', component: LoginComponent, canActivate: [isLoggedInGaurd] },

    {path: 'users', loadComponent: () => import('./auth/admin/admin-users/admin-users.component').then(m => m.AdminUsersComponent) ,canActivate: [adminGaurd] },


    
    { path: '**', component: NotFoundComponent }

];

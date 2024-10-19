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

export const routes: Routes = [

    {path: '', component: WelkomComponent },

    {path: 'home', component: HomeComponent },

    {path: 'bedragen', component: BedragComponent, children: [
        {path: 'add', component: NewBedragComponent}
    ]},

    {path: 'items', component: ItemComponentComponent, children: [
        {path: ':id', component: ItemDetailComponent, data: { showKoopButton: true } },
    ]},

    {path: 'items/:id/change', component: AanpasItemComponent, children: [
        {path: '', component: ItemDetailComponent, data: { showKoopButton: false } },
    ]},
    {path: 'signUp', component: SignUpComponent },
    {path: 'login', component: LoginComponent },
    

];

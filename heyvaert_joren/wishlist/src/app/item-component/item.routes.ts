import { Routes } from '@angular/router';
import { ItemComponentComponent } from '../item-component/item-component.component';
import { ItemDetailComponent } from '../item-component/item-detail/item-detail.component';
import { deactivateGaurd, loggedInChildGuard, loggedInGaurd } from '../auth/route-access.guard';
import { AanpasItemComponent } from './aanpas-item/aanpas-item.component';


export const itemRoutes: Routes = [

    {path: '', component: ItemComponentComponent, canActivate: [loggedInGaurd], canActivateChild: [loggedInChildGuard], children: [
        {path: ':id', component: ItemDetailComponent, data: { showKoopButton: true } },
    ]},
    {path: ':id/change', component: AanpasItemComponent, canActivate: [loggedInGaurd], canActivateChild: [loggedInChildGuard] , canDeactivate: [deactivateGaurd], children: [
        {path: '', component: ItemDetailComponent, data: { showKoopButton: false } },
    ]},

];
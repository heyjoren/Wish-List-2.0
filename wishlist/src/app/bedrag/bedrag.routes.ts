import { Routes } from '@angular/router';
import { loggedInChildGuard, loggedInGaurd } from '../auth/route-access.guard';
import { BedragComponent } from './bedrag.component';
import { NewBedragComponent } from './new-bedrag/new-bedrag.component';


export const bedragRoutes: Routes = [

    {path: '', component: BedragComponent, canActivate: [loggedInGaurd], canActivateChild: [loggedInChildGuard], children: [
        {path: 'add', component: NewBedragComponent }
    ]},

];
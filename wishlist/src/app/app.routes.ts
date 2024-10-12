import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BedragComponent } from './bedrag/bedrag.component';
import { ItemComponentComponent } from './item-component/item-component.component';
import { NewBedragComponent } from './bedrag/new-bedrag/new-bedrag.component';
import { ItemDetailComponent } from './item-component/item-detail/item-detail.component';
import { AanpasItemComponent } from './item-component/aanpas-item/aanpas-item.component';

export const routes: Routes = [

    {path: '', component: HomeComponent },

    {path: 'bedragen', component: BedragComponent, children: [
        {path: 'add', component: NewBedragComponent}
    ]},

    {path: 'items', component: ItemComponentComponent, children: [
        {path: ':id', component: ItemDetailComponent, data: { showKoopButton: true } },
    ]},

    {path: 'items/:id/change', component: AanpasItemComponent, children: [
        {path: '', component: ItemDetailComponent, data: { showKoopButton: false } },
    ]},
    

];

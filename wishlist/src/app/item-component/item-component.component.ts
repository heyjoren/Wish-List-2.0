import { Component } from '@angular/core';
import { TotaalBedragComponent } from '../bedrag/totaal-bedrag/totaal-bedrag.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BedragService } from '../bedrag/bedrag.service';
import { Router, RouterOutlet } from '@angular/router';
import { DialogService } from '../dialog.service';
import { ShowItemComponent } from './show-item/show-item.component';
import { ItemService } from './item.service';
import { CommonModule } from '@angular/common';
import { NewItemComponent } from './new-item/new-item.component';

@Component({
  selector: 'app-item-component',
  standalone: true,
  imports: [ ShowItemComponent,TotaalBedragComponent, MatIconModule, MatTooltipModule, CommonModule, RouterOutlet],
  templateUrl: './item-component.component.html',
  styleUrl: './item-component.component.css'
})
export class ItemComponentComponent {
  selectedItemId: string | null = null;

  constructor(protected bedragService: BedragService, private router: Router, private dialogService: DialogService, protected itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItemsnPut();
    this.bedragService.getBedragenPut();
  }

  onAdd(){
    const dialog = this.dialogService.openInDialog(NewItemComponent);
    dialog.afterClosed().subscribe(() =>{
      this.itemService.getItemsnPut();
    })
  }

  onItemClick(itemId: string){
    this.router.navigate(['items', itemId]);
    this.selectedItemId = itemId;
  }
}

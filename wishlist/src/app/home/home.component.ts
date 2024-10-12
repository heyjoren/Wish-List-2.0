import { Component } from '@angular/core';
import { item } from '../item-component/item.model';
import { ItemService } from '../item-component/item.service';
import { ShowItemComponent } from '../item-component/show-item/show-item.component';
import { TotaalBedragComponent } from '../bedrag/totaal-bedrag/totaal-bedrag.component';
import { CommonModule } from '@angular/common';
import { BedragService } from '../bedrag/bedrag.service';
import { ShowBedragComponent } from '../bedrag/show-bedrag/show-bedrag.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TotaalBedragComponent, ShowItemComponent, CommonModule, ShowBedragComponent, MatDialogModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  laatsteItems: item[] = [];
  selectedItemId: string | null = null;

  constructor(private itemService: ItemService, private bedragService: BedragService, private router: Router) {}

  ngOnInit(): void {
    this.itemService.getLastItems().subscribe({
      next: (items: item[]) => {
        this.laatsteItems = items;
      },
      error: (error) => {
        console.error('Error: ', error);
      }
    });

    this.bedragService.getBedragenPut();
  }

}

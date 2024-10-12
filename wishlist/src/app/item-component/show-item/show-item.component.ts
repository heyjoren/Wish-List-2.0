import { CommonModule } from '@angular/common';
import { Component, Input  } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { item } from '../item.model';
import { ItemService } from '../item.service';
import { ShortDescriptionPipe } from '../../short-description.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-show-item',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, ShortDescriptionPipe, MatIconModule, MatTooltipModule],
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.css'
})

export class ShowItemComponent {
  @Input() item: item = new item();
  @Input() showButtons: boolean = false;
  @Input() isSelected: boolean = false;

  constructor( private itemService: ItemService, private router: Router) {}


  onDelete(){
    this.itemService.deleteItem(this.item.id!).subscribe(
      (response: any) => {
          this.router.navigate(['items']);
      }
    )
  }

  onAanpas(){
    this.router.navigate(['items', this.item.id, 'change']);

  }
}

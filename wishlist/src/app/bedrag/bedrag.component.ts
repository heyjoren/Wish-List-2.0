import { Component } from '@angular/core';
import { TotaalBedragComponent } from './totaal-bedrag/totaal-bedrag.component';
import { ShowBedragComponent } from './show-bedrag/show-bedrag.component';
import { bedrag } from './bedrag.model';
import { BedragService } from './bedrag.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { DialogService } from '../dialog.service';
import { NewBedragComponent } from './new-bedrag/new-bedrag.component';
import { Subscription } from 'rxjs';
import { SortBedragenByDatePipePipe } from '../sort-bedragen-by-date-pipe.pipe';


@Component({
  selector: 'app-bedrag',
  standalone: true,
  imports: [TotaalBedragComponent, ShowBedragComponent, CommonModule, MatIconModule, MatTooltipModule, SortBedragenByDatePipePipe],
  templateUrl: './bedrag.component.html',
  styleUrl: './bedrag.component.css'
})
export class BedragComponent {
  bedragen: bedrag[] = [];
  bedragenSubscription!: Subscription;

  constructor(protected bedragService: BedragService, private router: Router, private dialogService: DialogService) {}

  ngOnInit(): void {
    this.bedragService.getBedragenPut();
  }

  ngOnDestroy(): void {
    if(this.bedragenSubscription) {
      this.bedragenSubscription.unsubscribe();
    }
  }

  getBedragen(){
    this.bedragService.getBedragen().subscribe({
      next: (bedragen: bedrag[]) => {
        this.bedragen = bedragen;
      },
      error: (error) => {
        console.error('Error fetching latest bedragen:', error);
      }
    });
  }
  

  onAdd(){
    this.router.navigate(['bedragen/add']);
    const dialog = this.dialogService.openInDialog(NewBedragComponent);
    dialog.afterClosed().subscribe(() =>{
      this.getBedragen();
    })
  }

}

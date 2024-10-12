import { Component, OnInit } from '@angular/core';
import { item } from '../item.model';
import { ItemService } from '../item.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { BedragService } from '../../bedrag/bedrag.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css',
  providers: [DatePipe]
})
export class ItemDetailComponent implements OnInit {
  item: item = new item();
  myDate = new Date();
  showKoopButton: boolean = true;

  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router, private bedragService: BedragService, private datePipe: DatePipe ) {}

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.onLoadItem(params['id']!); //  ! is om id niet 0 mag zijn.
    });

    this.route.data.subscribe((data: Data) => {
      this.showKoopButton = data['showKoopButton'];
    });
  }

  onLoadItem(id: string): void {
    this.itemService.getItem(id).subscribe({
     next: (response: item) => {
        this.item = response;
      },
      error: (error) => console.log('error: ', error)
  });
  }

  koop(){  
    
    const formattedDatum: string = this.datePipe.transform(this.myDate, 'dd-MM-yyyy') || '';

    const nieuwbedrag = {
      bedrag: this.item.prijs,
      teken: '-',
      datum: formattedDatum
    }
      
    this.bedragService.addBedrag(nieuwbedrag).subscribe({
      next: () => {
             
      },
      error: (error) => {
        console.error('Error: ', error);
      }
    });

    this.itemService.deleteItem(this.item.id!).subscribe(
      (response: any) => {
        this.router.navigate(['items']);
    }
    );
  }

}

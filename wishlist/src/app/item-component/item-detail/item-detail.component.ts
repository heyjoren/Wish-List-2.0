import { Component, OnInit } from '@angular/core';
import { item } from '../item.model';
import { ItemService } from '../item.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { BedragService } from '../../bedrag/bedrag.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css',
  providers: [DatePipe]
})
export class ItemDetailComponent implements OnInit  {
  item: item = new item();
  myDate = new Date();
  showKoopButton: boolean = true;
  saved: boolean = false;

  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router, private bedragService: BedragService,
     private datePipe: DatePipe,  private auth: AuthService ) {}

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
     next: (response: item | undefined) => {
      if (response) {
        this.item = response;
        this.item.id = id;
      }
      },
      error: (error) => console.log('error: ', error)
  });
  }

  koop(){  
    
    // const formattedDatum: string = this.datePipe.transform(this.myDate, 'dd-MM-yyyy') || '';

    console.log("item-detail.component.ts");
    const nieuwbedrag = {
      bedrag: Number(this.item.prijs),
      teken: '-',
      // datum: new Date (formattedDatum)
      datum: new Date (this.myDate),
      uid: this.auth.getUid() ?? '',
    }
    console.log("nieuwbedrag: " + nieuwbedrag);
    console.log("nieuwbedrag.bedrag: " + nieuwbedrag.bedrag);
    console.log("nieuwbedrag.datum: " + nieuwbedrag.datum);
    console.log("nieuwbedrag.teken: " + nieuwbedrag.teken);
    console.log("nieuwbedrag.uid: " + nieuwbedrag.uid);

      
    this.bedragService.addBedrag(nieuwbedrag).subscribe({
      next: () => {
             
      },
      error: (error) => {
        console.error('Error: ', error);
      }
    });
      console.log("added bedrag")

      this.item.toegevoegOp = this.getDate(this.item.toegevoegOp);

      console.log("item");
      console.log("item: " + this.item);
      console.log("item.beschrijving: " + this.item.beschrijving);
      console.log("item.fabrikant: " + this.item.fabrikant);
      console.log("item.id: " + this.item.id);
      console.log("item.img: " + this.item.img);
      console.log("item.naam: " + this.item.naam);
      console.log("item.prijs: " + this.item.prijs);
      console.log("item.toegevoegOp: " + this.item.toegevoegOp);
      console.log("item.uid: " + this.item.uid);    

    this.itemService.deleteItem(this.item!).subscribe(
      (response: any) => {
        this.router.navigate(['items']);
    }
    );
  }


  private getDate(dateField: any): Date {
    if (dateField && dateField.toDate) {
      return dateField.toDate();
    }
    return new Date(dateField);
  }



}

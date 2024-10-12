import { Component, ChangeDetectorRef } from '@angular/core';
import { bedrag } from '../bedrag.model';
import { BedragService } from '../bedrag.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-totaal-bedrag',
  standalone: true,
  imports: [],
  templateUrl: './totaal-bedrag.component.html',
  styleUrl: './totaal-bedrag.component.css'
})
export class TotaalBedragComponent {
  totaalBedrag: number = 0;
  bedragen: bedrag[] = [];
  private subscription: Subscription | null = null;

  constructor(private bedragService: BedragService, private cd: ChangeDetectorRef) {}


  ngOnInit(): void {
    this.subscription = this.bedragService.bedragenUpdated.subscribe(() => {
      this.berekenTotaalBedrag();
    });
  }

  berekenTotaalBedrag(): void {  
    let totaal: number = 0;
    this.bedragService.bedragen.forEach((bedrag) => {
      if(bedrag.teken == "+")
      {
        totaal += Number(bedrag.bedrag);
      }else if (bedrag.teken == "-")
      {
        totaal -= Number(bedrag.bedrag);
      }
      
    });
    this.totaalBedrag = totaal;
    this.totaalBedrag = Number(this.totaalBedrag.toFixed(2));
  }

}

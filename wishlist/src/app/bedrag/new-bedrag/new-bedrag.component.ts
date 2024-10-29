import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogService } from '../../dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { BedragService } from '../bedrag.service';
import { Router } from '@angular/router';
import { bedrag } from '../bedrag.model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-new-bedrag',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, FormsModule],
  templateUrl: './new-bedrag.component.html',
  styleUrl: './new-bedrag.component.css',
  providers: [DatePipe]
})
export class NewBedragComponent {

  constructor(private Dialogservice: DialogService, private dialogref: MatDialogRef<NewBedragComponent>, private bedragService: BedragService,
     private router: Router, private datePipe: DatePipe, private auth: AuthService) {}

  datum: string = '';
  bedrag: number = 0;
  teken: string = '+';
  bedragen: bedrag[] = [];
  filled: boolean = false;


  closeDialog(): void 
  {
    const bedragString: string = this.bedrag.toFixed(2).toString();
    const formattedDatum: string = this.datePipe.transform(this.datum, 'dd-MM-yyyy') || '';

    if(bedragString !== "0.00" || formattedDatum !== "")
    {
      this.filled = true;
    }

    if(this.filled)
    {
      const confirmClose = confirm('Je hebt nog niet opgeslagen. Ben je zeker dat je niet wilt opslaan?');
      if (!confirmClose) {
        return;
      }
    }
    this.Dialogservice.closeDialog(this.dialogref)
    this.router.navigate(['bedragen']);
  }

  toevoegen(): void{
    const bedragString: string = this.bedrag.toFixed(2).toString();
    const formattedDatum: string = this.datePipe.transform(this.datum, 'dd-MM-yyyy') || '';

    const nieuwbedrag = {
      bedrag: bedragString,
      teken: this.teken,
      datum: formattedDatum,
      uid: this.auth.getUid() ?? '',
    }
    
    if(nieuwbedrag.bedrag !== "0" && nieuwbedrag.teken !== "" && nieuwbedrag.datum !== "")
      {
        this.bedragService.addBedrag(nieuwbedrag).subscribe({
          next: () => {
            this.Dialogservice.closeDialog(this.dialogref);
            this.router.navigate(['bedragen']);
          },
          error: (error) => {
            console.error('Error: ', error);
          }
          });
      }
    }
  // }
}

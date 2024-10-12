import { Component } from '@angular/core';
import { DialogService } from '../../dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';;
import { ImgNamePipe } from '../../img-name.pipe';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, FormsModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css',
  providers: [ImgNamePipe],
})
export class NewItemComponent {
  naam: string = '';
  prijs: number = 0;
  beschrijving: string = '';
  img: string = '';
  fabrikant: string = '';

  constructor(private Dialogservice: DialogService, private dialogref: MatDialogRef<NewItemComponent>, 
    private itemService: ItemService, private router: Router, private http: HttpClient, private imgNamePipe: ImgNamePipe) {}


  closeDialog(){
    this.Dialogservice.closeDialog(this.dialogref)
    this.router.navigate(['items']);
  }

  toevoegen(){
    const prijsString: string = this.prijs.toFixed(2).toString();

    const nieuwitem = {
      naam: this.naam,
      prijs: prijsString,
      beschrijving: this.beschrijving,
      fabrikant: this.fabrikant,
      img: this.imgNamePipe.transform(this.img),
    }

    console.log('nieuwitem: ',nieuwitem);

    if (nieuwitem.naam !== "" && nieuwitem.prijs !== "0" && nieuwitem.fabrikant !== "")
      {
        this.itemService.addItems(nieuwitem).subscribe({
          next: () => {
            this.closeDialog();
          },
          error: (error) => {
            console.error('Error: ', error);
          }
        });
      }
  }
}

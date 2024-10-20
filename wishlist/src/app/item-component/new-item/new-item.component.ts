import { Component } from '@angular/core';
import { DialogService } from '../../dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';;
import { ImgNamePipe } from '../../img-name.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, ReactiveFormsModule, CommonModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css',
  providers: [ImgNamePipe],
})
export class NewItemComponent {
  // naam: string = '';
  // prijs: number = 0;
  // beschrijving: string = '';
  // // TEST
  // img: string = '';
  // // TEST tot hier
  // fabrikant: string = '';
  filled: boolean = false;
  toevoegenSwitch: boolean= false;
  file: File | null = null;
  form!: FormGroup;


  constructor(private Dialogservice: DialogService, private dialogref: MatDialogRef<NewItemComponent>, 
    private itemService: ItemService, private router: Router, private http: HttpClient, private imgNamePipe: ImgNamePipe, private fb : FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      naam: ['', Validators.required],
      prijs: ['', Validators.required],
      beschrijving: [''],
      fabrikant: ['', Validators.required],
      });
  }


  closeDialog(): void 
  {
    if(!this.toevoegenSwitch)
    {    
      // const prijsString: string = this.prijs.toFixed(2).toString();
      console.log(this.form.value.prijs.toFixed(2))
      const prijsString: string = this.form.value.prijs.toFixed(2).toString();

      if(this.form.value.naam !== "" || this.form.value.fabrikant !== "" || prijsString !== '0.00')
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
    }
    this.Dialogservice.closeDialog(this.dialogref)
    this.router.navigate(['items']);
  }

  async toevoegen(){
    this.toevoegenSwitch = true
    const prijsString: string = this.form.value.prijs.toFixed(2).toString();

    const nieuwitem = {
      naam: this.form.value.naam,
      prijs: prijsString,
      beschrijving: this.form.value.beschrijving,
      fabrikant: this.form.value.fabrikant,
      img: ""
    }

    console.log(nieuwitem)

    // if (nieuwitem.naam !== "" && nieuwitem.prijs !== "0" && nieuwitem.fabrikant !== "")
      // {
        const newId = this.itemService.createItemId();
        if(this.file)
        {
          const path = 'item/' + newId + '/' + this.file.name;
          nieuwitem.img = await this.itemService.uploadImg(path, this.file);
        }
        else{
          nieuwitem.img = "";
        }
        this.itemService.addItems(nieuwitem, newId).subscribe({
          next: () => {
            this.closeDialog();
            this.router.navigate(['items']);
          },
          error: (error) => {
            console.error('Error: ', error);
          }
        });
      // }
  }

  selectImg(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files[0])
    {
      this.file = target.files[0];

    }
  }


}

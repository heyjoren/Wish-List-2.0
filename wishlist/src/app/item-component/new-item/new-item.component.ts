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
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, ReactiveFormsModule, CommonModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css',
  providers: [ImgNamePipe],
})
export class NewItemComponent {
  filled: boolean = false;
  toevoegenSwitch: boolean= false;
  file: File | null = null;
  form!: FormGroup;


  constructor(private Dialogservice: DialogService, private dialogref: MatDialogRef<NewItemComponent>, 
    private itemService: ItemService, private router: Router, private http: HttpClient, private imgNamePipe: ImgNamePipe, private fb : FormBuilder,
    private auth: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      naam: ['', Validators.required],
      prijs: [0, Validators.required],
      beschrijving: [''],
      fabrikant: ['', Validators.required],
      });
  }


  closeDialog(): void 
  {
    if(!this.toevoegenSwitch)
    {    
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

    const nieuwitem = {
      naam: this.form.value.naam,
      prijs: this.form.value.prijs.toFixed(2),
      beschrijving: this.form.value.beschrijving,
      fabrikant: this.form.value.fabrikant,
      img: "",
      uid: this.auth.getUid() ?? '',
      toegevoegOp: new Date(),
    }

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
  }

  selectImg(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files[0])
    {
      this.file = target.files[0];

    }
  }


}

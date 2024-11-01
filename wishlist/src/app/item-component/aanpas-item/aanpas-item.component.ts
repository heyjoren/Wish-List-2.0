import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Params, Router, RouterOutlet } from '@angular/router';
import { ItemService } from '../item.service';
import { item } from '../item.model';
import { ImgNamePipe } from '../../img-name.pipe';
import { CanComponentDeactivate } from '../../auth/route-access.guard';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-aanpas-item',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, RouterOutlet, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './aanpas-item.component.html',
  styleUrl: './aanpas-item.component.css',
  providers: [ImgNamePipe],
})
export class AanpasItemComponent implements CanComponentDeactivate {
  item: item = new item();
  idFromRoute: string | null = null;
  saved: boolean = false;
  aanpassenSwitch: boolean= false;
  file: File | null = null;
  form!: FormGroup;
  isSubmitting: boolean = false;


  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router, private imgNamePipe: ImgNamePipe,
    private fb : FormBuilder){ }

  ngOnInit(){
    this.form = this.fb.group({
      naam: ['', Validators.required],
      prijs: ['', Validators.required],
      beschrijving: [''],
      fabrikant: ['', Validators.required],
      });

    this.route.paramMap
      .subscribe((params) => {
      this.idFromRoute = params.get('id');

      this.route.params.subscribe((params: Params) => {
        this.itemService.getItem(params['id']!).subscribe({
          next: (response: item | undefined) => {
            if (response) {
            this.item = response;
            this.vulInput();
            }
            else {
              console.log('Geen item gevonden');
            }
          },
          error: (error) => console.log('error: ', error)
        });
      });
    });
  }

  vulInput(){
    this.form.setValue({
      'naam' : this.item.naam,
      'prijs' : this.item.prijs,
      'beschrijving' : this.item.beschrijving,
      'fabrikant' : this.item.fabrikant

    })
  }

  closeSccreen(){
    if(!this.aanpassenSwitch)
      {      
        if(this.form.value.naam !== this.item.naam || this.form.value.fabrikant !== this.item.fabrikant || this.form.value.prijs !== this.item.prijs.toString())
        {
          console.log("if")
          this.saved = false;

        }
        else{
          this.saved = true;
        }
      }
    this.router.navigate(['items']);
  }

  async aanpassen(){
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.saved = true;

    this.aanpassenSwitch = true

    if(this.file)
    {
      if(this.item.img)
      {
        await this.itemService.deleteImg(this.item.img);
      }

      const path = 'item/' + this.idFromRoute + '/' + this.file.name;
      this.item.img = await this.itemService.uploadImg(path, this.file);
    }

    this.item.naam = this.form.value.naam;
    this.item.prijs = this.form.value.prijs.toFixed(2);
    this.item.fabrikant = this.form.value.fabrikant;
    this.item.beschrijving = this.form.value.beschrijving;


    this.itemService.updateItem(this.item, this.idFromRoute!) // this.idFromRoute! het ! is om te zeggen dat het niet null mag zijn.
      .then(() => {
        this.router.navigate(['items']);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.saved)
    {
      return confirm('Je hebt nog niet opgeslagen. Ben je zeker dat je niet wilt opslaan?');
    }
    return true;
  }

  selectImg(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files[0])
    {
      this.file = target.files[0];

    }
  }
  
}

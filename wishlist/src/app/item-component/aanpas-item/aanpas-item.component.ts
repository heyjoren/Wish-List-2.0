import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Params, Router, RouterOutlet } from '@angular/router';
import { ItemService } from '../item.service';
import { item } from '../item.model';
import { ImgNamePipe } from '../../img-name.pipe';
import { CanComponentDeactivate } from '../../auth/route-access.guard';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-aanpas-item',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, RouterOutlet, FormsModule],
  templateUrl: './aanpas-item.component.html',
  styleUrl: './aanpas-item.component.css',
  providers: [ImgNamePipe],
})
export class AanpasItemComponent implements CanComponentDeactivate {
  item: item = new item();
  naam: string = '';
  prijs: number = 0;
  beschrijving: string = '';
  img: string = '';
  // img: File | null =null;
  selectedFile: File | null = null;
  fabrikant: string = '';
  // nieuw
  idFromRoute: string | null = null;
  saved: boolean = false;


  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router, private imgNamePipe: ImgNamePipe){ }

  ngOnInit(){
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
    this.naam = this.item.naam;
    this.prijs = parseFloat(this.item.prijs);
    this.beschrijving = this.item.beschrijving;
    if (this.item.img && this.item.img.trim().length > 0){
      this.selectedFile = new File([/* data */], this.item.img);
    }
    this.fabrikant = this.item.fabrikant;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  closeSccreen(){
    this.router.navigate(['items']);
  }

  aanpassen(){
    this.saved = true;
    if(this.img.includes("C:\\fakepath\\"))
    {
      this.item.img = this.imgNamePipe.transform(this.img)
    } 

    this.item.naam = this.naam;
    this.item.prijs = this.prijs.toFixed(2).toString();
    this.item.fabrikant = this.fabrikant;
    this.item.beschrijving = this.beschrijving;

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
  
}

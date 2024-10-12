import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Params, Router, RouterOutlet } from '@angular/router';
import { ItemService } from '../item.service';
import { item } from '../item.model';
import { ImgNamePipe } from '../../img-name.pipe';
// import { FileReader } from 'file-reader';


@Component({
  selector: 'app-aanpas-item',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, RouterOutlet, FormsModule],
  templateUrl: './aanpas-item.component.html',
  styleUrl: './aanpas-item.component.css',
  providers: [ImgNamePipe],
})
export class AanpasItemComponent {
  item: item = new item();
  naam: string = '';
  prijs: number = 0;
  beschrijving: string = '';
  img: string = '';
  // img: File | null =null;
  selectedFile: File | null = null;
  fabrikant: string = '';

  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router, private imgNamePipe: ImgNamePipe){ }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.itemService.getItem(params['id']!).subscribe({ //id mag niet 0 zijn.
        next: (response: item) => {
           this.item = response;
           this.vulInput();
         },
         error: (error) => console.log('error: ', error)
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
    if(this.img.includes("C:\\fakepath\\"))
    {
      this.item.img = this.imgNamePipe.transform(this.img)
    } 

    this.item.naam = this.naam;
    this.item.prijs = this.prijs.toFixed(2).toString();
    this.item.fabrikant = this.fabrikant;
    this.item.beschrijving = this.beschrijving;


    this.itemService.updateItem(this.item).subscribe(
      (response: item) => {
        this.router.navigate(['items']);
      }
    )
  }

  // aanpassen() {
  //   this.item.naam = this.naam;
  //   this.item.prijs = this.prijs.toFixed(2).toString();
  //   this.item.fabrikant = this.fabrikant;
  //   this.item.beschrijving = this.beschrijving;

  //   if (this.selectedFile) {
  //     this.convertFileToString(this.selectedFile)
  //       .then((blobString) => {
  //         const base64Data = blobString.split(',')[1];
  //         this.item.img = base64Data;
  //         this.item.img = blobString;
  //         this.itemService.updateItem(this.item).subscribe(
  //           (response: item) => {
  //             this.router.navigate(['items']);
  //           }
  //         );
  //       })
  //       .catch((error) => {
  //         console.error('Error converting file to string:', error);
  //       });
  //   } else {
  //     this.item.img = '';
  //     this.itemService.updateItem(this.item).subscribe(
  //       (response: item) => {
  //         this.router.navigate(['items']);
  //       }
  //     );
  //   }
  // }
  
  // convertFileToString(file: File): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.onload = () => {
  //       const blobString = fileReader.result as string;
  //       resolve(blobString);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //     fileReader.readAsDataURL(file);
  //   });
  
  // }
  
}

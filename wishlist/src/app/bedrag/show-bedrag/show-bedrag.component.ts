import { Component, Input } from '@angular/core';
import { bedrag } from '../bedrag.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BedragService } from '../bedrag.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-show-bedrag',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, CommonModule],
  templateUrl: './show-bedrag.component.html',
  styleUrl: './show-bedrag.component.css'
})
export class ShowBedragComponent {
  @Input() bedrag: bedrag = new bedrag();
  datum: Date =new Date();
  
  constructor( private bedragService: BedragService, private router: Router) {  }

  onDelete(){
    this.bedragService.deleteBedrag(this.bedrag.id!).subscribe(
      (response: any) => {
          this.router.navigate(['bedragen']);
      }
    )
  }

}

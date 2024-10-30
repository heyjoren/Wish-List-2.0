import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogService } from '../../dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BedragService } from '../bedrag.service';
import { Router } from '@angular/router';
import { bedrag } from '../bedrag.model';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-new-bedrag',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, FormsModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './new-bedrag.component.html',
  styleUrl: './new-bedrag.component.css',
  providers: [DatePipe]
})
export class NewBedragComponent {

  constructor(private Dialogservice: DialogService, private dialogref: MatDialogRef<NewBedragComponent>, private bedragService: BedragService,
     private router: Router, private datePipe: DatePipe, private auth: AuthService, private fb : FormBuilder) {}

  bedragen: bedrag[] = [];
  form!: FormGroup;
  isButtonClicked: boolean = false;

  ngOnInit(): void {
    const today = new Date().toISOString().substring(0, 10);
    this.form = this.fb.group({
      datum: [today, Validators.required],
      bedrag: ['0', [Validators.required, Validators.min(0.01)]],
      teken: ['+', Validators.required],
      });
  }


  closeDialog(): void 
  {
    if(this.form.dirty)
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
    this.isButtonClicked = true;
    if(this.form.valid)
    {
      const nieuwbedrag = {
        bedrag: this.form.value.bedrag,
        teken: this.form.value.teken,
        datum: new Date(this.form.value.datum),
        uid: this.auth.getUid() ?? '',
      }

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
}

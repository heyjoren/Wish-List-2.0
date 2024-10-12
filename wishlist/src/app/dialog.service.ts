import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openInDialog(Component: ComponentType<any>){
    return this.dialog.open(Component, {
      width: '800px',
      disableClose: true
    });
  }

  closeDialog(dialogRef: MatDialogRef<any>): void{
    dialogRef.close();
  }
}

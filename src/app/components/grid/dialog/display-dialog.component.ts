import {Component, Inject} from '@angular/core';
import {MatDialog,  MatSelect,MatButton, MatDatepickerInput, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'dialog-override',
  templateUrl: 'display-dialog.component.html',
  styleUrls: ['display-dialog.component.scss']
})
export class DisplayDialogComponent {

public isTotalType: boolean = true;
 public data: any;
 public amount: number;
 public isCancel: boolean;
 public types: Array<Object> = [{"name":"Total", "id" : "1"},
 {"name":"Incremental","id":"2"}];
 constructor(public dialogRef: MatDialogRef<DisplayDialogComponent>) { }

 onCancelClick(): void {
	this.isCancel = true;
    this.dialogRef.close();
  }
 
 onSubmit(): void {
    this.isCancel = false;
	this.dialogRef.close();
 }

  typeChange(value : any): void{
    if(value == 1){
      this.isTotalType = true;
    }
    else{
      this.isTotalType = false;
    }
  }

}

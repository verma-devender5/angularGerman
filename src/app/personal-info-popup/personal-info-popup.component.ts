import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-personal-info-popup',
  templateUrl: './personal-info-popup.component.html',
  styleUrls: ['./personal-info-popup.component.css'],
})
export class PersonalInfoPopupComponent implements OnInit {
  uid: any;
  name: any;
  food: any;
  constructor(
    private dialogRef: MatDialogRef<PersonalInfoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.uid = data.uid;
    console.log(data.name);
  }

  ngOnInit(): void {
    console.log('name: ' + this.uid);
  }
  CloseDialog() {
    this.dialogRef.close(false);
  }
}

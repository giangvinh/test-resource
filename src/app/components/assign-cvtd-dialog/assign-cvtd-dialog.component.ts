import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTableDataSource
} from '@angular/material';
import { DialogData } from 'src/app/shared/models/share.model';
import { assginTDVDialogMock } from 'src/app/shared/mocks/appraisalGD.mock';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-assign-cvtd-dialog',
  templateUrl: './assign-cvtd-dialog.component.html',
  styleUrls: ['./assign-cvtd-dialog.component.scss']
})
export class AssignCvtdDialogComponent implements OnInit {
  public type: boolean;
  public title: string;
  public content: string;
  public btnName: string;
  public checked: false;
  formDate = new FormControl(new Date());

  displayedColumns: string[] = ['chon', 'ten', 'soHDdangXL'];
  dataSource = new MatTableDataSource<any>(assginTDVDialogMock);

  constructor(
    public dialogRef: MatDialogRef<AssignCvtdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close();
  }
}

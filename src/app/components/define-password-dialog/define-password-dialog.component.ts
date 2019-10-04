import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/shared/models/share.model';

@Component({
  selector: 'app-define-password-dialog',
  templateUrl: './define-password-dialog.component.html',
  styleUrls: ['./define-password-dialog.component.scss']
})
export class DefinePasswordDialogComponent implements OnInit {
  public type: boolean;
  public title: string;
  public content: string;
  public password = '';
  public retypePassword = '';
  public btnName: string;
  public hide = true;

  constructor(
    public dialogRef: MatDialogRef<DefinePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    if (this.data.type) {
      this.title = 'Cấp lại mật khẩu';
      this.content = `Cấp lại mật khẩu cho người dùng ${this.data.name}`;
      this.btnName = 'Cấp mật khẩu';
    } else {
      this.title = 'Đổi mật khẩu';
      this.content = 'Đổi mật khẩu mới';
      this.btnName = 'Đổi mật khẩu';
    }
  }

  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close();
  }
}

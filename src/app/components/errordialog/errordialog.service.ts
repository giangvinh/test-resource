import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ErrorDialogComponent } from "./errordialog.component";

@Injectable()
export class ErrorDialogService {
  public title: string;
  public isDialogOpen: Boolean = false;
  constructor(public dialog: MatDialog) {}
  openDialog(data): any {
    if (this.isDialogOpen) {
      return false;
    }
    this.isDialogOpen = true;

    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: "450px",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
      // if (result.data.status === 401) {
      // const returnUrl = "";
      // const state = { returnUrl };
      // this.authService.signOut(state);
      //}
    });
  }
}

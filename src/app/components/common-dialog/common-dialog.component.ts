import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData, EButtonType } from "src/app/shared/models/share.model";

@Component({
  selector: "app-common-dialog",
  templateUrl: "./common-dialog.component.html",
  styleUrls: ["./common-dialog.component.scss"]
})
export class CommonDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CommonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}

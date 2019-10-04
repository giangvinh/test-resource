import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from "@angular/material";
import { roleMock } from "src/app/shared/mocks/role.mock";
import { DialogData } from "src/app/shared/models";

@Component({
  selector: "app-role-dialog",
  templateUrl: "./role-dialog.component.html",
  styleUrls: ["./role-dialog.component.scss"],
})
export class RoleDialogComponent implements OnInit {
  public type: boolean;
  displayedColumns: string[] = ["tenQuyen", "operation"];
  dataSource = new MatTableDataSource<any>(roleMock);

  constructor(
    public dialogRef: MatDialogRef<RoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

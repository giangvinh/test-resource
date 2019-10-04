import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { EButtonType } from "src/app/shared/models";
import { CommonDialogComponent } from "src/app/components/common-dialog/common-dialog.component";
import { DefinePasswordDialogComponent } from "src/app/components/define-password-dialog/define-password-dialog.component";
import { fileMock } from "src/app/shared/mocks/file-management.mock";

@Component({
  selector: "app-files-managment",
  templateUrl: "./files-managment.component.html",
  styleUrls: ["./files-managment.component.scss"]
})
export class FilesManagmentComponent implements OnInit {
  formDate = new FormControl(new Date());
  toDate = new FormControl(new Date().toISOString());
  displayedColumns: string[] = [
    "ma",
    "donViYeuCau",
    "nguoiDaiDien",
    "mucDich",
    "soTS",
    "trangThai",
    "operation"
  ];
  dataSource = new MatTableDataSource<Object>(fileMock);
  selected = "option2";
  employeeCount = 10;
  EButtonType = EButtonType;

  operation: string = "Mở khóa";
  name: string = "Vinh";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(btnType: EButtonType): void {
    switch (btnType) {
      case EButtonType.Delete:
        this.operation = "XÓA";
        break;
      case EButtonType.Lock:
        this.operation = "KHÓA";
        break;
      case EButtonType.Unlock:
        this.operation = "MỞ KHÓA";
        break;
      default:
        this.operation = "XÓA";
        break;
    }
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: "250px",
      data: {
        name: `${this.operation} khách hàng ${this.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result");
    });
  }

  openDefineDialog(modalType: boolean): void {
    const dialogRef = this.dialog.open(DefinePasswordDialogComponent, {
      width: "600px",
      height: "300px",
      data: { type: modalType, name: "Nguyễn Văn A" }
    });

    dialogRef.afterClosed().subscribe(password => {
      console.log("password");
    });
  }
}

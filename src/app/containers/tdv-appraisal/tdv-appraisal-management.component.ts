import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { EButtonType } from "src/app/shared/models";
import { appraisalGDMock } from "src/app/shared/mocks/appraisalGD.mock";
import { AssignCvtdDialogComponent } from "src/app/components/assign-cvtd-dialog/assign-cvtd-dialog.component";

@Component({
  selector: "app-tdv-appraisal-management",
  templateUrl: "./tdv-appraisal-management.component.html",
  styleUrls: ["./tdv-appraisal-management.component.scss"],
})
export class TdvAppraisalManagementComponent implements OnInit {
  formDate = new FormControl(new Date());
  toDate = new FormControl(new Date().toISOString());
  displayedColumns: string[] = [
    "ma",
    "khachHang",
    "mucDich",
    "CVTD",
    "ngayBatDau",
    "ngayPhanCong",
    "ngayKetThuc",
    "trangThai",
    "operation",
  ];
  dataSource = new MatTableDataSource<Object>(appraisalGDMock);
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

  openDefineDialog(): void {
    const dialogRef = this.dialog.open(AssignCvtdDialogComponent, {
      width: "900px",
      height: "600px",
      data: { name: "HS-0010/2019/05" },
    });

    dialogRef.afterClosed().subscribe(password => {
      console.log("password");
    });
  }
}

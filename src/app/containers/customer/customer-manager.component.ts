import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { CommonDialogComponent } from "src/app/components/common-dialog/common-dialog.component";
import { customerMock } from "src/app/shared/mocks/customer.mock";
import { ICustomer } from "src/app/shared/services";

@Component({
  selector: "app-customer-manager",
  templateUrl: "./customer-manager.component.html",
  styleUrls: ["./customer-manager.component.scss"],
})
export class CustomerManagerComponent implements OnInit {
  displayedColumns: string[] = [
    "donVi",
    "diaChi",
    "nguoiPhuTrach",
    "sdt",
    "email",
    "slHD",
    "doanhThu",
    "operation",
  ];
  dataSource = new MatTableDataSource<any>(customerMock);
  name: string = "Vinh";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: "250px",
      data: { name: this.name, operation: "XÓA", component: "Khách hàng" },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result");
    });
  }
}

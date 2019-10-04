import { Component, OnInit } from "@angular/core";
import { MatDialog, PageEvent, MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { IpService, IIp } from "../../shared/services";
import { IPagingInfo, ServiceResult, EButtonType } from "../../shared/models";
import { AddIpDialogComponent, EditIpDialogComponent } from "..";
import { CommonDialogComponent } from "../../components";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-ip-management",
  templateUrl: "./ip-management.component.html",
  styleUrls: ["./ip-management.component.scss"],
  entryComponents: [AddIpDialogComponent]
})
export class IpManagementComponent implements OnInit {
  title = "IP truy cập hệ thống";
  displayedColumns: string[] = ["ip", "from", "to", "requestedBy", "reason", "operation"];
  paging: IPagingInfo = {
    total: 0,
    page: 1,
    size: 10,
    pageSizeOptions: [5, 10, 20, 50]
  };
  dataSource: IIp[] = [];

  EButtonType = EButtonType;

  constructor(public dialog: MatDialog, private ipService: IpService, private snackBar: SnackbarService) {}

  ngOnInit() {
    this.updateList();
  }

  updateList($event: PageEvent = <PageEvent>{ pageIndex: 0, pageSize: 10 }) {
    this.ipService.getList($event.pageIndex + 1, $event.pageSize).subscribe(data => {
      this.dataSource = data.items;
      this.paging = <IPagingInfo>{
        page: $event.pageIndex,
        size: $event.pageSize,
        total: data.total,
        pageSizeOptions: this.paging.pageSizeOptions
      };
    });
  }

  openAddIpWhitelist() {
    const dialogRef = this.dialog.open(AddIpDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe((data: ServiceResult) => {
      if (data.isSuccess) {
        this.snackBar.open("Thêm IP thành công!");
        this.updateList();
      }
    });
  }

  edit(ip: IIp) {
    const dialogRef = this.dialog.open(EditIpDialogComponent, {
      data: {
        data: ip.id
      }
    });

    dialogRef.afterClosed().subscribe((data: ServiceResult) => {
      if (data.isSuccess) {
        this.snackBar.open("Cập nhật IP thành công!");
        this.reload();
      }
    });
  }

  openDialog(btnType: EButtonType, id: number, title: string): void {
    let text = "";
    switch (btnType) {
      case EButtonType.Delete:
        text = "XÓA";
        break;
      case EButtonType.Lock:
        text = "khóa";
        break;
      case EButtonType.Unlock:
        text = "mở khóa";
        break;
    }
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: "350px",
      data: {
        name: title,
        operation: text,
        component: "địa chỉ IP"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (btnType) {
          case EButtonType.Delete:
            this.ipService.delete(id).subscribe(x => {
              this.snackBar.open("Xóa thành công");
              this.reload();
            });
            break;
          case EButtonType.Lock:
            this.ipService.lock(id, false).subscribe(x => {
              this.snackBar.open("Khóa IP thành công");
              this.reload();
            });
            break;
          case EButtonType.Unlock:
            this.ipService.lock(id, true).subscribe(x => {
              this.snackBar.open("Mở khóa IP thành công");
              this.reload();
            });
            break;
        }
      }
    });
  }

  reload() {
    this.updateList(<PageEvent>{ pageIndex: this.paging.page, pageSize: this.paging.size });
  }
}

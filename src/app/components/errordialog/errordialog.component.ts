import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-errordialog",
  templateUrl: "./errordialog.component.html",
  styleUrls: ["./errordialog.component.scss"]
})
export class ErrorDialogComponent implements OnInit {
  title = "Đã xảy ra lỗi!";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.status === 401) {
      this.title = "Phiên làm việc của bạn đã hết hạn. Bạn có muốn đăng nhập lại không?";
    }
  }

  ngOnInit() {}
}

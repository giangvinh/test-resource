import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData } from "src/app/shared/models";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
})
export class FileUploadComponent implements OnInit {
  get uploadUrl(): string {
    return this.dialogData.data.uploadUrl;
  }

  afuConfig = {
    multiple: true,
    formatsAllowed: ".jpg, .png",
    maxSize: "5",
    uploadAPI: {
      url: this.uploadUrl,
      method: "POST",
      // headers: {
      //   //"Content-Type": "text/plain;charset=UTF-8",
      //   //"Authorization" : `Bearer ${token}`
      // },
    },
    theme: "dragNDrop",
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: "Chọn file",
      resetBtn: "Xóa hết",
      uploadBtn: "Tải lên",
      dragNDropBox: "Kéo thả file vào đây",
      afterUploadMsg_success: "Tải lên thành công !",
      afterUploadMsg_error: "Xảy ra lỗi. Vui lòng [Xóa hết] và thử lại !",
    },
  };

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FileUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {}
  docUpload($event) {
    console.log($event);
    if ($event.status === 200) {
      this.snackbarService.open("Tải thành công.");
      //this.dialogRef.close();
    }
  }
}

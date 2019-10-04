import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { IpService, IIp } from "../../../shared/services/ip.service";
import { ServiceResult } from "../../../shared/models/common";
import { DialogData } from "../../../shared/models";
import { ipValidator } from "../../../shared/methods";

@Component({
  selector: "app-add-ip-dialog",
  templateUrl: "./add-ip-dialog.component.html",
  styleUrls: ["./add-ip-dialog.component.scss"]
})
export class AddIpDialogComponent implements OnInit {
  public currentDate = new FormControl(new Date());
  public formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddIpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fb: FormBuilder,
    private ipService: IpService
  ) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }

  /* Reactive form */
  createForm() {
    this.formGroup = this.fb.group({
      ip: [null, Validators.required, ipValidator],
      from: [null],
      to: [null],
      requestedBy: [null, Validators.required],
      reason: [null]
    });
  }

  onSave() {
    const addIpData = <IIp>{
      ip: this.formGroup.value.ip,
      from: this.formGroup.value.from,
      to: this.formGroup.value.to,
      requestedBy: this.formGroup.value.requestedBy,
      reason: this.formGroup.value.reason
    };
    this.ipService.addIp(addIpData).subscribe(r => {
      if (r.status === 204) {
        this.dialogRef.close(<ServiceResult>{ isSuccess: true });
      }
    });
  }
}

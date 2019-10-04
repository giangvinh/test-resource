import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData } from "src/app/shared/models/share.model";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { IpService, IIp } from "../../../shared/services/ip.service";
import { ServiceResult } from "../../../shared/models/common";
import { ipValidator } from "../../../shared/methods";

@Component({
  selector: "app-edit-ip-dialog",
  templateUrl: "../add/add-ip-dialog.component.html",
  styleUrls: ["../add/add-ip-dialog.component.scss"],
})
export class EditIpDialogComponent implements OnInit {
  public currentDate = new FormControl(new Date());
  public formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditIpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fb: FormBuilder,
    private ipService: IpService
  ) {}

  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close();
  }

  ngOnInit() {
    this.ipService.get(this.data.data).subscribe(ip => this.createForm(ip));
  }

  /* Reactive form */
  createForm(data: IIp) {
    this.formGroup = this.fb.group({
      id: [data.id],
      ip: [data.ip, Validators.required, ipValidator],
      from: [data.from],
      to: [data.to],
      requestedBy: [data.requestedBy, Validators.required],
      reason: [data.reason],
    });
  }

  onSave() {
    const addIpData = <IIp>{
      id: this.data.data,
      ip: this.formGroup.value.ip,
      from: this.formGroup.value.from,
      to: this.formGroup.value.to,
      requestedBy: this.formGroup.value.requestedBy,
      reason: this.formGroup.value.reason,
    };
    this.ipService.updateIp(addIpData).subscribe(r => {
      this.dialogRef.close(<ServiceResult>{ isSuccess: true });
    });
  }
}

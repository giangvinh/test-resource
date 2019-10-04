import { Component, OnInit, Inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData, IContractFee, ServiceResult } from "src/app/shared/models";
import { ContractFeeService } from "src/app/shared/services";

@Component({
  selector: "app-update-fee-dialog",
  templateUrl: "./update-fee-dialog.component.html",
  styleUrls: ["./update-fee-dialog.component.scss"]
})
export class UpdateFeeDialogComponent implements OnInit {
  public currentDate = new FormControl(new Date());
  public formGroup: FormGroup;
  currencyMask: any;
  income: IContractFee;
  isEdit: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<UpdateFeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fb: FormBuilder,
    private feeService: ContractFeeService
  ) {
    dialogRef.disableClose = true;
  }
  get contractId() {
    return this.data.data.contractId;
  }
  ngOnInit() {
    if (this.contractId) {
      this.feeService.getIncome(this.contractId).subscribe(income => {
        this.income = income;
        this.createForm();
        this.formGroup.disable();
      });
    }
  }
  edit() {
    this.formGroup.enable();
    this.isEdit = true;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  /* Reactive form */
  createForm() {
    const feeObject: IContractFee = this.income;
    this.formGroup = this.fb.group({
      invoiceValue: [
        feeObject.invoiceValue ? feeObject.invoiceValue : 0,
        Validators.required
      ],
      afterTaxValue: [
        feeObject.afterTaxValue ? feeObject.afterTaxValue : 0,
        Validators.required
      ],
      byCash: [feeObject.byCash ? feeObject.byCash : 0],
      byBank: [feeObject.byBank ? feeObject.byBank : 0],
      inDebt: [feeObject.inDebt ? feeObject.inDebt : 0],
      inDebtReason: [feeObject.inDebtReason],
      receivedDate: [
        feeObject.receivedDate ? new Date(feeObject.receivedDate) : null
      ],
      note: [feeObject.note],
      invoiceCode: [feeObject.invoiceCode],
      invoicedDate: [
        feeObject.invoicedDate ? new Date(feeObject.invoicedDate) : null
      ],
      commission: [feeObject.commission ? feeObject.commission : 0],
      commissionDate: [
        feeObject.commissionDate ? new Date(feeObject.commissionDate) : null
      ],
      contracted: [feeObject.contracted]
    });
  }

  onSave() {
    const formValue = { ...this.formGroup.value };
    const feeObject: IContractFee = <IContractFee>{
      ...this.income,
      invoiceValue: formValue.invoiceValue
        ? +String(formValue.invoiceValue).replace(/,/g, "")
        : 0,
      afterTaxValue: formValue.afterTaxValue
        ? +String(formValue.afterTaxValue).replace(/,/g, "")
        : 0,
      byCash: formValue.byCash
        ? +String(formValue.byCash).replace(/,/g, "")
        : 0,
      byBank: formValue.byBank
        ? +String(formValue.byBank).replace(/,/g, "")
        : 0,
      inDebt: formValue.inDebt
        ? +String(formValue.inDebt).replace(/,/g, "")
        : 0,
      inDebtReason: formValue.inDebtReason,
      receivedDate: formValue.receivedDate
        ? formValue.receivedDate.toISOString()
        : null,
      note: formValue.note,
      invoiceCode: formValue.invoiceCode,
      invoicedDate: formValue.invoicedDate
        ? formValue.invoicedDate.toISOString()
        : null,
      commission: formValue.commission
        ? +String(formValue.commission).replace(/,/g, "")
        : 0,
      commissionDate: formValue.commissionDate
        ? formValue.commissionDate.toISOString()
        : null,
      contracted: formValue.contracted
    };
    this.feeService.updateFee(this.contractId, feeObject).subscribe(r => {
      if (r.status === 204) {
        this.dialogRef.close(<ServiceResult>{ isSuccess: true });
      }
    });
  }
}

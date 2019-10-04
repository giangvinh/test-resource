import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import {
  ContractService,
  SnackbarService,
  CustomerService,
  ICustomer,
  ICustomerOrg,
} from "src/app/shared/services";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { DialogData, IContractSales, EContractSource } from "src/app/shared/models";
import { SearchForOrgComponent, SearchForCustomerComponent } from "src/app/containers";

@Component({
  selector: "app-add-contract",
  templateUrl: "./add-contract.component.html",
  styleUrls: ["./add-contract.component.scss"],
})
export class AddContractDialogComponent implements OnInit {
  formGroup: FormGroup;
  selectedOrg: ICustomerOrg;
  selectedCustomer: ICustomer;
  selectedReferer: ICustomer;
  contractSource = EContractSource;
  isReview: boolean = false;
  contractKey: string = "";
  get isEdit() {
    return !!this.data.data;
  }
  canEdit: boolean = false;
  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddContractDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private contractService: ContractService,
    private customerService: CustomerService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit() {
    this.createForm();
    if (this.data.data) {
      this.contractService
        .getContractForSale(this.data.data)
        .subscribe((contract: IContractSales) => this.updateForm(contract));
    }
  }

  /* Reactive form */
  createForm() {
    this.formGroup = this.fb.group({
      noOrg: [false],
      orgId: [null],
      orgName: [null, Validators.required],
      orgAddress: [null, Validators.required],
      orgPhoneNumber: [null, Validators.required],
      orgTaxCode: [null, Validators.required],
      customerId: [null],
      customerName: [null, Validators.required],
      customerPhoneNumber: [null, Validators.required],
      customerEmail: [null, Validators.required],
      customerDoB: [null],
      contractCode: [null],
      contractedDate: [null],
      appraisalCode: [null, Validators.required],
      appraisalPurpose: [null, Validators.required],
      isPriceOverview: [false],
      isSameOrg: [false],
      refererId: [null],
      refererName: [null],
      refererOrgId: [null],
      refererOrgName: [null],
      refererPhoneNumber: [null],
      source: [10],
      contactPerson: [null, Validators.required],
      contactPersonPhoneNumber: [null, Validators.required],
    });
  }

  updateForm(contract: IContractSales) {
    this.contractKey = contract.contractKey;
    const noOrg = !contract.orgName;
    this.formGroup.setValue({
      noOrg: noOrg,
      orgId: contract.orgId,
      orgName: contract.orgName,
      orgAddress: contract.orgAddress,
      orgPhoneNumber: contract.orgPhoneNumber,
      orgTaxCode: contract.orgTaxCode,
      customerId: contract.customerId,
      customerName: contract.customerName,
      customerPhoneNumber: contract.customerPhoneNumber,
      customerEmail: contract.customerEmail,
      customerDoB: contract.customerDoB,
      contractCode: contract.contractCode,
      contractedDate: contract.contractedDate,
      appraisalCode: contract.appraisalCode,
      appraisalPurpose: contract.appraisalPurpose,
      isPriceOverview: contract.isPriceOverview,
      isSameOrg: contract.isSameOrg,
      refererId: contract.refererId,
      refererName: contract.refererName,
      refererOrgId: contract.refererOrgId,
      refererOrgName: contract.refererOrgName,
      refererPhoneNumber: contract.refererPhoneNumber,
      source: contract.source,
      contactPerson: contract.contactPerson,
      contactPersonPhoneNumber: contract.contactPersonPhoneNumber,
    });
    this.onCustomerTypeChange(noOrg);
    this.onOriginChange(contract.isSameOrg);
    this.onPriceOverViewChange(contract.isPriceOverview);
    this.canEdit = contract.canEdit;
    if (this.isEdit && !this.canEdit) {
      this.formGroup.disable();
    }
  }

  getOrgId() {
    if (
      !this.selectedOrg ||
      this.formGroup.value.orgName != this.selectedOrg.name ||
      this.formGroup.value.orgAddress != this.selectedOrg.address ||
      this.formGroup.value.orgPhoneNumber != this.selectedOrg.phoneNumber ||
      this.formGroup.value.orgTaxCode != this.selectedOrg.taxCode
    ) {
      return null;
    }
    return this.selectedOrg.id;
  }

  getCustomerId() {
    if (
      !this.selectedCustomer ||
      this.formGroup.value.customerName != this.selectedCustomer.name ||
      this.formGroup.value.customerEmail != this.selectedCustomer.email ||
      this.formGroup.value.customerPhoneNumber != this.selectedCustomer.phoneNumber ||
      this.formGroup.value.customerDoB != this.selectedCustomer.doB
    ) {
      return null;
    }
    return this.selectedCustomer.id;
  }
  getRefererId() {
    if (
      !this.selectedReferer ||
      this.selectedReferer.name != this.formGroup.value.refererName ||
      this.selectedReferer.phoneNumber != this.formGroup.value.refererphoneNumber
    ) {
      return null;
    }
    return this.selectedReferer.id;
  }
  getReferedOrgId() {
    if (!this.selectedReferer || this.selectedReferer.orgName != this.formGroup.value.refererOrgName) {
      return null;
    }
    return this.selectedReferer.orgId;
  }

  onSave() {
    if (!this.formGroup.invalid) {
      if (this.isReview) {
        const orgId = this.getOrgId();
        const customerId = this.getCustomerId();
        const refererId = this.getRefererId();
        const refererOrgId = this.getReferedOrgId();
        const data = {
          id: this.data.data,
          orgId: orgId,
          orgName: this.formGroup.value.orgName,
          orgAddress: this.formGroup.value.orgAddress,
          orgPhoneNumber: this.formGroup.value.orgPhoneNumber,
          orgTaxCode: this.formGroup.value.orgTaxCode,
          customerId: customerId,
          customerName: this.formGroup.value.customerName,
          customerPhoneNumber: this.formGroup.value.customerPhoneNumber,
          customerEmail: this.formGroup.value.customerEmail,
          customerDoB: this.formGroup.value.customerDoB,
          contractCode: this.formGroup.value.contractCode,
          contractedDate: this.formGroup.value.contractedDate,
          appraisalCode: this.formGroup.value.appraisalCode,
          appraisalPurpose: this.formGroup.value.appraisalPurpose,
          isPriceOverview: this.formGroup.value.isPriceOverview,
          isSameOrg: this.formGroup.value.isSameOrg,
          refererId: refererId,
          refererName: this.formGroup.value.refererName,
          refererOrgId: refererOrgId,
          refererOrgName: this.formGroup.value.refererOrgName,
          refererPhoneNumber: this.formGroup.value.refererPhoneNumber,
          source: Number(this.formGroup.value.source),
          contactPerson: this.formGroup.value.contactPerson,
          contactPersonPhoneNumber: this.formGroup.value.contactPersonPhoneNumber,
        };
        if (this.isEdit) {
          this.contractService.updateContract(data).subscribe(r => {
            if (r.status === 204) {
              this.dialogRef.close(true);
            }
          });
        } else {
          this.contractService.addContract(data).subscribe(r => {
            if (r.status === 204) {
              this.dialogRef.close(true);
            }
          });
        }
      } else {
        this.review();
      }
    } else {
      this.snackBar.open("Thông tin chưa hợp lệ. Vui lòng nhập lại.");
    }
  }

  searchForOrg() {
    if (!this.formGroup.controls["noOrg"].value && !this.isReview) {
      const dialogRef = this.dialog.open(SearchForOrgComponent, {
        width: "650px",
        data: {},
      });

      dialogRef.afterClosed().subscribe((data: any) => {
        if (data) {
          this.onSelectOrgChange(data.id);
        }
      });
    }
  }

  onSelectOrgChange(id: number) {
    this.customerService.getOrg(id).subscribe((org: ICustomerOrg) => {
      this.selectedOrg = org;
      this.formGroup.controls["orgId"].setValue(org.id);
      this.formGroup.controls["orgName"].setValue(org.name);
      this.formGroup.controls["orgAddress"].setValue(org.address);
      this.formGroup.controls["orgPhoneNumber"].setValue(org.phoneNumber);
      this.formGroup.controls["orgTaxCode"].setValue(org.taxCode);
    });
  }
  onSelectCustomerChange(id: number) {
    this.customerService.getCustomer(id).subscribe((customer: ICustomer) => {
      this.selectedCustomer = customer;
      this.formGroup.controls["customerId"].setValue(customer.id);
      this.formGroup.controls["customerName"].setValue(customer.name);
      this.formGroup.controls["customerEmail"].setValue(customer.email);
      this.formGroup.controls["customerPhoneNumber"].setValue(customer.phoneNumber);
      this.formGroup.controls["customerDoB"].setValue(customer.doB);
    });
  }
  searchForCustomer() {
    if (this.isReview) {
      return;
    }
    const dialogRef = this.dialog.open(SearchForCustomerComponent, {
      width: "650px",
      data: {
        data: {
          isReferer: false,
          orgId: null,
        },
      },
    });

    dialogRef.afterClosed().subscribe((data: ICustomer) => {
      if (data) {
        this.onSelectCustomerChange(data.id);
        if (data.orgId) {
          this.onSelectOrgChange(data.orgId);
        }
      }
    });
  }

  searchForReferer() {
    if (this.isReview) {
      return;
    }
    const dialogRef = this.dialog.open(SearchForCustomerComponent, {
      width: "650px",
      data: {
        data: {
          isReferer: true,
          orgId: null,
        },
      },
    });

    dialogRef.afterClosed().subscribe((data: ICustomer) => {
      if (data) {
        this.onSelectRefererChange(data.id);
      }
    });
  }
  onSelectRefererChange(id: number) {
    this.customerService.getCustomer(id).subscribe(customer => {
      this.selectedReferer = customer;
      this.formGroup.controls["refererId"].setValue(customer.id);
      this.formGroup.controls["refererName"].setValue(customer.name);
      this.formGroup.controls["refererPhoneNumber"].setValue(customer.phoneNumber);
      this.formGroup.controls["refererOrgId"].setValue(customer.orgId);
      this.formGroup.controls["refererOrgName"].setValue(customer.orgName);
    });
  }
  onNoClick() {
    this.dialogRef.close();
  }

  onCustomerTypeChange(checked: boolean) {
    if (checked) {
      this.formGroup.controls["orgName"].disable();
      this.formGroup.controls["orgAddress"].disable();
      this.formGroup.controls["orgPhoneNumber"].disable();
      this.formGroup.controls["orgTaxCode"].disable();

      this.formGroup.controls["orgId"].setValue(null);
      this.formGroup.controls["orgName"].setValue(null);
      this.formGroup.controls["orgAddress"].setValue(null);
      this.formGroup.controls["orgPhoneNumber"].setValue(null);
      this.formGroup.controls["orgTaxCode"].setValue(null);
    } else {
      this.formGroup.controls["orgName"].enable();
      this.formGroup.controls["orgAddress"].enable();
      this.formGroup.controls["orgPhoneNumber"].enable();
      this.formGroup.controls["orgTaxCode"].enable();
    }
  }

  onPriceOverViewChange(checked: boolean) {
    if (checked) {
      this.formGroup.controls["contractCode"].disable();
      this.formGroup.controls["contractedDate"].disable();

      this.formGroup.controls["contractedDate"].setValue(null);
      this.formGroup.controls["contractCode"].setValue(null);
    } else {
      this.formGroup.controls["contractCode"].enable();
      this.formGroup.controls["contractedDate"].enable();
    }
  }

  onOriginChange(checked: boolean) {
    if (checked) {
      this.formGroup.controls["refererName"].disable();
      this.formGroup.controls["refererOrgName"].disable();
      this.formGroup.controls["refererPhoneNumber"].disable();

      this.formGroup.controls["refererId"].setValue(null);
      this.formGroup.controls["refererOrgId"].setValue(null);

      this.formGroup.controls["refererName"].setValue(null);
      this.formGroup.controls["refererOrgName"].setValue(null);
      this.formGroup.controls["refererPhoneNumber"].setValue(null);
    } else {
      this.formGroup.controls["refererName"].enable();
      this.formGroup.controls["refererOrgName"].enable();
      this.formGroup.controls["refererPhoneNumber"].enable();
    }
  }

  review() {
    this.isReview = true;
    this.formGroup.disable();
  }

  reinput() {
    this.isReview = false;
    this.formGroup.enable();
    this.onCustomerTypeChange(this.formGroup.value.noOrg);
    this.onOriginChange(this.formGroup.value.isSameOrg);
    this.onPriceOverViewChange(this.formGroup.value.isPriceOverview);
  }
}

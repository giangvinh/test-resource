import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DialogData, IAddressDetail, IAddress, IAsset } from "src/app/shared/models";
import { AssetService, AddressService } from "src/app/shared/services";

@Component({
  selector: "app-add-asset",
  templateUrl: "./add-asset.component.html",
  styleUrls: ["./add-asset.component.scss"],
})
export class AddAssetComponent implements OnInit {
  formGroup: FormGroup;
  public states: IAddressDetail[];
  public districts: IAddressDetail[];
  public wards: IAddressDetail[];
  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddAssetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private assetService: AssetService,
    private addressService: AddressService
  ) {}
  private get isEdit() {
    return !!this.data.data.assetId;
  }

  private get assetId() {
    return this.data.data.assetId;
  }

  private get contractId() {
    return this.data.data.contractId;
  }

  async ngOnInit() {
    this.states = await this.addressService.getCitiesOrStates().toPromise();
    this.createForm();
    if (this.isEdit) {
      this.assetService.getAsset(this.contractId, this.assetId).subscribe(asset => this.updateForm(asset));
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
  updateForm(asset: IAsset) {
    this.formGroup.setValue({
      name: asset.name,
      addressLine1: asset.address ? asset.address.addressLine1 : null,
      wardId: asset.address ? asset.address.wardId : null,
      districtId: asset.address ? asset.address.districtId : null,
      stateOrProvinceId: asset.address ? asset.address.stateOrProvinceId : null,
    });
  }

  createForm() {
    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      addressLine1: [null],
      wardId: [null],
      districtId: [null],
      stateOrProvinceId: [null],
    });
  }

  async onCitySelected(e: any) {
    const cityId = e;
    this.wards = [];
    this.districts = await this.addressService.getDistrictByStateId(+cityId);
  }

  async onDistrictSelected(e: any) {
    const districtId = e;
    this.wards = await this.addressService.getWardByDistrictId(+districtId);
  }

  onSave() {
    if (!this.formGroup.invalid) {
      const data: IAsset = <IAsset>{
        id: this.assetId,
        name: this.formGroup.value.name,
        address: <IAddress>{
          addressLine1: this.formGroup.value.addressLine1,
          stateOrProvinceId: this.formGroup.value.stateOrProvinceId,
          districtId: this.formGroup.value.districtId,
          wardId: this.formGroup.value.wardId,
        },
      };
      if (!this.isEdit) {
        this.assetService.addAsset(this.contractId, data).subscribe(r => {
          if (r.status === 204) {
            this.dialogRef.close(true);
          }
        });
      } else {
        this.assetService.updateAsset(this.contractId, data).subscribe(r => {
          if (r.status === 204) {
            this.dialogRef.close(true);
          }
        });
      }
    }
  }
}

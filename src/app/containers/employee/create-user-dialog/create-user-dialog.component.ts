import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData } from "src/app/shared/models/share.model";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { EmployeeService } from "../../../shared/services/employee.service";
import {
  ICommonInfo,
  IAddressDetail,
  IBranch,
  EEducationStatus,
  EMaritalStatus,
  IEmployee
} from "../../../shared/models";
import { take } from "rxjs/operators";
import { AddressService, DepartmentService } from "src/app/shared/services";

@Component({
  selector: "app-create-user-dialog",
  templateUrl: "./create-user-dialog.component.html",
  styleUrls: ["./create-user-dialog.component.scss"]
})
export class CreateUserDialogComponent implements OnInit {
  @ViewChild("placeOfBirth", { static: false }) placeOfBirthElem;
  @ViewChild("issuedProvince", { static: false }) issuedProvinceElem;
  @ViewChild("currentlyWard", { static: false }) currentlyWardElem;
  @ViewChild("currentlyDistrict", { static: false }) currentlyDistrictElem;
  @ViewChild("currentlyState", { static: false }) currentlyStateElem;
  @ViewChild("permanentlyWard", { static: false }) permanentlyWardElem;
  @ViewChild("permanentlyDistrict", { static: false }) permanentlyDistrictElem;
  @ViewChild("permanentlyState", { static: false }) permanentlyStateElem;
  public listPositions: ICommonInfo[];
  public listDepartments: ICommonInfo[];
  public listBranches: IBranch[];
  public formGroup: FormGroup;
  public educationStatus = EEducationStatus;
  public maritalStatus = EMaritalStatus;

  // Current address
  public listCities: IAddressDetail[];
  public listDistricts: IAddressDetail[];
  public listWards: IAddressDetail[];
  // permanently address
  public listPermanentlyDistricts: IAddressDetail[];
  public listPermanentlyWards: IAddressDetail[];

  // date validate
  public dateNow = new Date();
  public maxBoD = new Date(this.dateNow.getFullYear() - 16, this.dateNow.getMonth(), this.dateNow.getDay());
  private employee: any;

  constructor(
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fb: FormBuilder,
    private employeeService: EmployeeService,
    private addressService: AddressService,
    private departmentService: DepartmentService
  ) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async ngOnInit() {
    // this.listCities = await this.addressService.getCitiesOrStates().toPromise();
    // this.listDepartments = await this.departmentService.getDepartments().toPromise();
    // this.listPositions = await this.departmentService.getPositions().toPromise();
    // this.listBranches = await this.departmentService.getBranches().toPromise();
    this.createForm();
    // if (!this.data.type) {
    //   this.employeeService
    //     .getEmployeeById(this.data.data)
    //     .pipe(take(1))
    //     .subscribe(async employee => {
    //       this.employee = employee;
    //       await this.createOptionSelect();

    //       this.formGroup.setValue({
    //         fullName: this.employee.fullName,
    //         employeeCode: this.employee.employeeCode,
    //         gender: `${this.employee.gender}`,
    //         phoneNumber1: this.employee.phoneNumber1,
    //         idCode: this.employee.idCode,
    //         doB: this.employee.doB ? new Date(this.employee.doB) : "",
    //         phoneNumber2: this.employee.phoneNumber2,
    //         officialEmail: this.employee.officialEmail,
    //         personalEmail: this.employee.personalEmail,
    //         permanentlyAddressLine1: this.employee.permanentlyAddress
    //           ? this.employee.permanentlyAddress.addressLine1
    //           : "",
    //         permanentlyWardId: this.employee.permanentlyAddress
    //           ? this.employee.permanentlyAddress.wardId
    //           : "",
    //         permanentlyDistrictId: this.employee.permanentlyAddress
    //           ? this.employee.permanentlyAddress.districtId
    //           : "",
    //         permanentlyStateOrProvinceId: this.employee.permanentlyAddress
    //           ? this.employee.permanentlyAddress.stateOrProvinceId
    //           : "",
    //         currentlyAddressLine1: this.employee.currentlyAddress
    //           ? this.employee.currentlyAddress.addressLine1
    //           : "",
    //         currentlyWardId: this.employee.currentlyAddress ? this.employee.currentlyAddress.wardId : "",
    //         currentlyDistrictId: this.employee.currentlyAddress
    //           ? this.employee.currentlyAddress.districtId
    //           : "",
    //         currentlyStateOrProvinceId: this.employee.currentlyAddress
    //           ? this.employee.currentlyAddress.stateOrProvinceId
    //           : "",
    //         issuedDate: this.employee.issuedDate ? new Date(this.employee.issuedDate) : "",
    //         issuedProvinceId: this.employee.issuedProvinceId ? this.employee.issuedProvinceId : "",
    //         education: this.employee.education,
    //         workingStartedDate: this.employee.workingStartedDate
    //           ? new Date(this.employee.workingStartedDate)
    //           : "",
    //         workingQuality: this.employee.workingQuality,
    //         workingEvaluated: this.employee.workingEvaluated,
    //         departmentId: this.employee.departmentId,
    //         branchId: this.employee.branchId,
    //         positionId: this.employee.positionId,
    //         placeOfBirthId: this.employee.placeOfBirthId,
    //         hobby: this.employee.hobby,
    //         professionalAt: this.employee.professionalAt,
    //         educationDetail: this.employee.educationDetail,
    //         maritalStatus: this.employee.maritalStatus,
    //         numberOfChildren: this.employee.numberOfChildren
    //       });
    //     });
    // }
  }

  /* Reactive form */
  createForm() {
    const numberPattern = "^[0-9]*$";
    this.formGroup = this.fb.group({
      fullName: [null, Validators.required],
      employeeCode: [{ value: null, disabled: true }],
      gender: ["0", Validators.required],
      phoneNumber1: [null, Validators.required],
      idCode: [null, [Validators.required, Validators.pattern(numberPattern), Validators.maxLength(12)]],
      doB: [null, Validators.required],
      phoneNumber2: [null],
      officialEmail: [null, Validators.email],
      personalEmail: [null, Validators.email],
      permanentlyAddressLine1: [null],
      permanentlyWardId: [null],
      permanentlyDistrictId: [null],
      permanentlyStateOrProvinceId: [null],
      currentlyAddressLine1: [null],
      currentlyWardId: [null],
      currentlyDistrictId: [null],
      currentlyStateOrProvinceId: [null],
      issuedDate: [null, Validators.required],
      issuedProvinceId: [null, Validators.required],
      education: [null, Validators.required],
      workingStartedDate: [null, Validators.required],
      workingQuality: [null],
      workingEvaluated: [null],
      departmentId: [null, Validators.required],
      branchId: [null, Validators.required],
      positionId: [null, Validators.required],
      placeOfBirthId: [null],
      hobby: [null],
      professionalAt: [null],
      educationDetail: [null],
      maritalStatus: [null],
      numberOfChildren: [null, Validators.pattern(numberPattern)]
    });
  }

  onSavePost() {
    if (this.formGroup.valid) {
      const employee: IEmployee = {
        id: !this.data.type ? this.data.data : 0,
        fullName: this.formGroup.value.fullName,
        employeeCode: this.formGroup.value.employeeCode,
        gender: +this.formGroup.value.gender,
        doB: this.formGroup.value.doB ? this.formGroup.value.doB.toISOString() : "",
        phoneNumber1: this.formGroup.value.phoneNumber1,
        phoneNumber2: this.formGroup.value.phoneNumber2,
        officialEmail: this.formGroup.value.officialEmail,
        personalEmail: this.formGroup.value.personalEmail,
        permanentlyAddress: {
          id: 0,
          addressLine1: this.formGroup.value.permanentlyAddressLine1,
          ward: "",
          wardId: +this.formGroup.value.permanentlyWardId,
          district: "",
          districtId: +this.formGroup.value.permanentlyDistrictId,
          city: "",
          stateOrProvinceId: +this.formGroup.value.permanentlyStateOrProvinceId,
          addressLine2: ""
        },
        currentlyAddress: {
          id: 0,
          addressLine1: this.formGroup.value.currentlyAddressLine1,
          ward: "",
          wardId: +this.formGroup.value.currentlyWardId,
          district: "",
          districtId: +this.formGroup.value.currentlyDistrictId,
          city: "",
          stateOrProvinceId: +this.formGroup.value.currentlyStateOrProvinceId,
          addressLine2: ""
        },
        avatar: "",
        idCode: this.formGroup.value.idCode,
        issuedDate: this.formGroup.value.issuedDate ? this.formGroup.value.issuedDate.toISOString() : "",
        issuedProvinceId: this.formGroup.value.issuedProvinceId,
        education: +this.formGroup.value.education,
        educationDetail: "",
        maritalStatus: +this.formGroup.value.maritalStatus,
        workingStartedDate: this.formGroup.value.workingStartedDate
          ? this.formGroup.value.workingStartedDate.toISOString()
          : "",
        workingQuality: this.formGroup.value.workingQuality,
        workingEvaluated: this.formGroup.value.workingEvaluated,
        departmentName: "",
        departmentId: +this.formGroup.value.departmentId,
        branchName: "",
        branchId: +this.formGroup.value.branchId,
        position: "",
        positionId: +this.formGroup.value.positionId,
        isLocked: false,
        roleId: "",
        roleName: "",
        professionalAt: this.formGroup.value.professionalAt,
        placeOfBirth: "",
        placeOfBirthId: +this.formGroup.value.placeOfBirthId,
        hobby: this.formGroup.value.hobby,
        numberOfChildren: +this.formGroup.value.numberOfChildren,
        userId: ""
      };
      !this.data.type
        ? this.employeeService.updateEmployee(employee).subscribe(_ => this.onNoClick())
        : this.employeeService.postEmployee(employee).subscribe(_ => this.onNoClick());
    }
  }

  async onPermanentlyCitySelected(e: any) {
    const cityId = e;
    this.listPermanentlyWards = [];
    this.listPermanentlyDistricts = await this.addressService.getDistrictByStateId(+cityId);
  }

  async onPermanentlyDistrictSelected(e: any) {
    const districtId = e;
    this.listPermanentlyWards = await this.addressService.getWardByDistrictId(+districtId);
  }

  async onCitySelected(e: any) {
    const cityId = e;
    this.listWards = [];
    this.listDistricts = await this.addressService.getDistrictByStateId(+cityId);
  }
  async onDistrictSelected(e: any) {
    const districtId = e;
    this.listWards = await this.addressService.getWardByDistrictId(+districtId);
  }

  async createOptionSelect() {
    await this.placeOfBirthElem.onSelectionChange({
      value: this.employee.placeOfBirthId
    });
    await this.issuedProvinceElem.onSelectionChange({
      value: this.employee.issuedProvinceId
    });

    if (this.employee.currentlyAddress) {
      await this.currentlyStateElem.onSelectionChange({
        value: this.employee.currentlyAddress.stateOrProvinceId
      });
      await this.currentlyDistrictElem.onSelectionChange({
        value: this.employee.currentlyAddress.districtId
      });
      await this.currentlyWardElem.onSelectionChange({
        value: this.employee.currentlyAddress.wardId
      });
    }
    if (this.employee.permanentlyAddress) {
      await this.permanentlyStateElem.onSelectionChange({
        value: this.employee.permanentlyAddress.stateOrProvinceId
      });

      await this.permanentlyDistrictElem.onSelectionChange({
        value: this.employee.permanentlyAddress.districtId
      });

      await this.permanentlyWardElem.onSelectionChange({
        value: this.employee.permanentlyAddress.wardId
      });
    }
  }
}

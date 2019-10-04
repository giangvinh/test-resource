import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./custom-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";

import { appRoutes } from "./app.routes";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./containers/home/home.component";
import { CommonDialogComponent } from "./components/common-dialog/common-dialog.component";
import { DefinePasswordDialogComponent } from "./components/define-password-dialog/define-password-dialog.component";
import { CustomerManagerComponent } from "./containers/customer/customer-manager.component";
import { RoleDialogComponent } from "./components/role-dialog/role-dialog.component";
import { FilesManagmentComponent } from "./containers/files/files-managment.component";
import { TdvAppraisalManagementComponent } from "./containers/tdv-appraisal/tdv-appraisal-management.component";
import { AssignCvtdDialogComponent } from "./components/assign-cvtd-dialog/assign-cvtd-dialog.component";
import { AssignAssetsComponent } from "./components/assign-assets/assign-assets.component";
import { CvtdAppraisalManagementComponent } from "./containers/cvtd-appraisal/cvtd-appraisal-management.component";
import {
  MatPaginatorIntl,
  MAT_DATE_LOCALE,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
} from "@angular/material";
import { getPaginatorIntl } from "./shared/models/common";
import { CountdownComponent } from "./components/countdown/countdown.component";
import {
  IpManagementComponent,
  AddIpDialogComponent,
  EditIpDialogComponent,
  ContractManagementSalesComponent,
  AddContractDialogComponent,
  SearchForOrgComponent,
  SearchForCustomerComponent,
  AssetsComponent,
  AddAssetComponent,
  AddAssetLegalPaperComponent,
  EmployeeManagerComponent,
  CreateUserDialogComponent,
  CreateAccountComponent,
  FeeManagmentComponent,
  RoleManagerComponent,
  UpdateFeeDialogComponent,
  AppraisalManagementComponent,
  ContractValuationComponent,
  AssignTdvDialogComponent
} from "./containers";
import { MenuComponent, MenuUserComponent, FileUploadComponent } from "./components";
import { EnumToArrayPipe, CurrenCyMaskPipe, EnumBooleanToArrayPipe } from "./shared/pipes";
import { ErrorDialogComponent } from "./components/errordialog/errordialog.component";
import { ErrorDialogService } from "./components/errordialog/errordialog.service";
import { AutocompleteSelectComponent } from "./components/autocomplete-select/autocomplete-select.component";
import { SnackbarService } from "./shared/services/snackbar.service";
import { MatPasswordStrengthModule } from "./modules/password/mat-password-strength.module";
import { AngularFileUploaderModule } from "./components/angular-file-uploader/angular-file-uploader.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountdownComponent,
    IpManagementComponent,
    EmployeeManagerComponent,
    CommonDialogComponent,
    RoleManagerComponent,
    DefinePasswordDialogComponent,
    CustomerManagerComponent,
    RoleDialogComponent,
    FilesManagmentComponent,
    FeeManagmentComponent,
    AppraisalManagementComponent,
    AssignTdvDialogComponent,
    TdvAppraisalManagementComponent,
    AssignCvtdDialogComponent,
    AssignAssetsComponent,
    CvtdAppraisalManagementComponent,
    ContractManagementSalesComponent,
    CreateUserDialogComponent,
    CreateAccountComponent,
    MenuComponent,
    MenuUserComponent,
    AddIpDialogComponent,
    EditIpDialogComponent,
    EnumToArrayPipe,
    CurrenCyMaskPipe,
    EnumBooleanToArrayPipe,
    AddContractDialogComponent,
    ErrorDialogComponent,
    AutocompleteSelectComponent,
    SearchForOrgComponent,
    SearchForCustomerComponent,
    AssetsComponent,
    AddAssetComponent,
    AddAssetLegalPaperComponent,
    FileUploadComponent,
    UpdateFeeDialogComponent,
    ContractValuationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatPasswordStrengthModule.forRoot(),
    AngularFileUploaderModule
  ],
  providers: [
    ErrorDialogService,
    SnackbarService,
    { provide: MatPaginatorIntl, useFactory: getPaginatorIntl },
    { provide: MAT_DATE_LOCALE, useValue: "vi-VN" },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  entryComponents: [
    CommonDialogComponent,
    DefinePasswordDialogComponent,
    RoleDialogComponent,
    AssignTdvDialogComponent,
    AssignCvtdDialogComponent,
    CreateUserDialogComponent,
    CreateAccountComponent,
    AddIpDialogComponent,
    EditIpDialogComponent,
    AddContractDialogComponent,
    ErrorDialogComponent,
    SearchForOrgComponent,
    SearchForCustomerComponent,
    AssetsComponent,
    AddAssetComponent,
    AddAssetLegalPaperComponent,
    FileUploadComponent,
    UpdateFeeDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

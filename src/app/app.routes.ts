import { Routes } from "@angular/router";

import { HomeComponent } from "./containers/home/home.component";
import {
  IpManagementComponent,
  ContractManagementSalesComponent,
  FeeManagmentComponent,
  EmployeeManagerComponent,
  AppraisalManagementComponent,
  ContractValuationComponent
} from "./containers";
import { RoleManagerComponent } from "./containers/role/role-manager.component";
import { CustomerManagerComponent } from "./containers/customer/customer-manager.component";
import { FilesManagmentComponent } from "./containers/files/files-managment.component";
import { TdvAppraisalManagementComponent } from "./containers/tdv-appraisal/tdv-appraisal-management.component";
import { CvtdAppraisalManagementComponent } from "./containers/cvtd-appraisal/cvtd-appraisal-management.component";

export const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: "ip",
    component: IpManagementComponent
  },
  {
    path: "employee",
    component: EmployeeManagerComponent
  },
  {
    path: "role",
    component: RoleManagerComponent
  },
  {
    path: "customer",
    component: CustomerManagerComponent
  },
  {
    path: "file",
    component: FilesManagmentComponent
  },
  {
    path: "fee",
    component: FeeManagmentComponent
  },
  {
    path: "appraisal",
    component: AppraisalManagementComponent
  },
  {
    path: "tdv-appraisal",
    component: TdvAppraisalManagementComponent
  },
  {
    path: "ctvd-appraisal",
    component: CvtdAppraisalManagementComponent
  },
  {
    path: "contract",
    component: ContractManagementSalesComponent
  },
  {
    path: "contract-valuation/:id",
    component: ContractValuationComponent
  }
];

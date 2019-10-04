export interface IContractSales {
  id: number;
  contractKey: string;
  orgId?: number;
  orgName: string;
  orgAddress: string;
  orgPhoneNumber: string;
  orgTaxCode: string;
  customerId?: number;
  customerName: string;
  customerPhoneNumber: string;
  customerEmail: string;
  customerDoB: string;
  contractCode: string;
  appraisalPurpose: string;
  contractedDate?: Date;
  appraisalCode: string;
  isPriceOverview: boolean;
  isSameOrg: boolean;
  refererId?: number;
  refererName: string;
  refererOrgId?: number;
  refererOrgName: string;
  refererPhoneNumber: string;
  source: EContractSource;
  contactPerson: string;
  contactPersonPhoneNumber: string;
  status: number;
  numberOfAssets: number;
  canEdit: boolean;
}

export interface IAppraisalPrincipal extends IContractSales {
  valuers: any;
  assignedDate: string;
  dueDate: string;
  reassignedDate: string;
}

export enum EContractSource {
  "Tự khai thác" = 5,
  "Nguồn được giao" = 10,
}

export interface IContractSearch {
  keyword: string;
  from?: Date;
  to?: Date;
  status: number;
}

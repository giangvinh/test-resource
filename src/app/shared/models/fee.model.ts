export interface IContractFee {
  id: number;
  contractKey: string;
  contractId: number;
  contractCode: any;
  organizationName: string;
  customerName: string;
  certificates: string[];
  invoiceValue: number;
  byCash: number;
  byBank: number;
  inDebt: number;
  inDebtReason: string;
  receivedDate: string;
  note: string;
  invoiceCode: string;
  invoicedDate: string;
  commission: number;
  commissionDate: string;
  afterTaxValue: number;
  contracted?: boolean;
}

export interface ISearchFee {
  inDebt?: boolean;
  commission?: boolean;
  invoice?: boolean;
  keyword: string;
  fromDate?: Date;
  toDate?: Date;
}

export enum EInDebtFilter {
  "Tất cả" = "null",
  "Còn nợ" = "true",
  "Hết nợ" = "false",
}

export enum EInvoiceFilter {
  "Tất cả" = "null",
  "Đã xuất" = "true",
  "Chưa xuất" = "false",
}

export enum ECommissionFilter {
  "Tất cả" = "null",
  "Đã chi" = "true",
  "Chưa chi" = "false",
}

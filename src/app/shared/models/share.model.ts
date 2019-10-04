export interface DialogData {
  type?: boolean;
  component?: string;
  name?: string;
  operation?: string;
  data?: any;
}

export enum EButtonType {
  Lock = 0,
  Unlock = 1,
  Delete = 2,
  Edit = 3,
}

export interface IAddress {
  id: number;
  addressLine1: string;
  ward: string;
  wardId: number;
  district: string;
  districtId: number;
  city: string;
  stateOrProvinceId: number;
  addressLine2: string;
}

export interface ICommonInfo {
  id: number;
  name: string;
}

export interface IStringInfo {
  id: string;
  name: string;
}

export interface IAddressDetail {
  id: number;
  type: string;
  name: string;
  parentId: number;
}

export interface IMedia {
  mediaId: string;
  mediaUrl: string;
}

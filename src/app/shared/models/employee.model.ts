import { IAddress } from "./share.model";

export interface IEmployee {
  id: number;
  fullName: string;
  employeeCode: string;
  gender: number;
  doB: string;
  phoneNumber1: string;
  phoneNumber2: string;
  officialEmail: string;
  personalEmail: string;
  permanentlyAddress: IAddress;
  currentlyAddress: IAddress;
  avatar: string;
  idCode: string;
  issuedDate: string;
  issuedProvinceId: number;
  education: number;
  educationDetail: string;
  maritalStatus: number;
  workingStartedDate: string;
  workingQuality: string;
  workingEvaluated: string;
  departmentName: string;
  departmentId: number;
  branchName: string;
  branchId: number;
  position: string;
  positionId: number;
  isLocked: boolean;
  roleId: string;
  roleName: string;
  professionalAt: string;
  placeOfBirth: string;
  placeOfBirthId: number;
  hobby: number;
  numberOfChildren: number;
  userId: string;
  selected?: boolean;
}

export interface ISearchEmp {
  positionId: number;
  branchId: number;
  departmentId: number;
  keyword: string;
  isLocked: boolean;
}

export interface IBranch {
  id: number;
  name: string;
  address: IAddress;
}

export interface IAssignEmp {
  empIds: { id: number; selected: boolean }[];
  assignDate: string;
}

export enum EMaritalStatus {
  /// Độc thân
  "Độc thân" = 1,
  /// Kết hôn
  "Kết hôn" = 2,
  /// Ly thân
  "Ly thân" = 3,
  /// Ly dị
  "Ly dị" = 4,
  /// Góa
  "Góa" = 5
}

export enum EGender {
  "Nam" = 1,
  "Nữ" = 2
}

export enum EEducationStatus {
  "Trung học" = 1,
  "Cao đẳng" = 2,
  "Đại học" = 3,
  "Thạc sĩ" = 4,
  "Tiến sĩ" = 5,
  "Giáo sư" = 6
}

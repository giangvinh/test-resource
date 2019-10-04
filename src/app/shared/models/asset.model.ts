import { IAddress, IMedia } from "./share.model";

export interface IAsset {
  id: number;
  name: string;
  address: IAddress;
  legalPapers: IAssetPaper[];
}

export interface IAssetPaper {
  id: number;
  description: string;
  gallery: IMedia[];
}

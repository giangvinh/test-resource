import { IAssetPaper } from "./../models";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IAsset } from "../models";

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: "root",
})
export class AssetService {
  constructor(private http: HttpClient) {}

  getAssets(contractId: number) {
    const url = `${environment.apiUrl}/contracts/${contractId}/assets`;
    return this.http.get<IAsset[]>(url);
  }

  getAsset(contractId: number, assetId: number) {
    const url = `${environment.apiUrl}/contracts/${contractId}/assets/${assetId}`;
    return this.http.get<IAsset>(url);
  }

  addAsset(contractId: number, data: IAsset) {
    const url = `${environment.apiUrl}/contracts/${contractId}/assets`;
    return this.http.post(url, data, { observe: "response" });
  }

  updateAsset(contractId: number, data: IAsset) {
    const url = `${environment.apiUrl}/contracts/${contractId}/assets/${data.id}`;
    return this.http.put(url, data, { observe: "response" });
  }

  deleteAsset(contractId: number, assetId: number) {
    const url = `${environment.apiUrl}/contracts/${contractId}/assets/${assetId}`;
    return this.http.delete(url, { observe: "response" });
  }

  getAssetPapers(assetId: number) {
    const url = `${environment.apiUrl}/assets/${assetId}/legal-papers/`;
    return this.http.get<IAssetPaper[]>(url);
  }

  getAssetPaper(assetId: number, paperId: number) {
    const url = `${environment.apiUrl}/assets/${assetId}/legal-papers/${paperId}`;
    return this.http.get<IAssetPaper>(url);
  }

  addLegalPaper(assetId: number, data: IAssetPaper) {
    const url = `${environment.apiUrl}/assets/${assetId}/legal-papers`;
    return this.http.post(url, data, { observe: "response" });
  }

  deleteLegalPaper(assetId: number, paperId: number) {
    const url = `${environment.apiUrl}/assets/${assetId}/legal-papers/${paperId}`;
    return this.http.delete(url, { observe: "response" });
  }

  updateLegalPaper(assetId: number, data: IAssetPaper) {
    const url = `${environment.apiUrl}/assets/${assetId}/legal-papers/${data.id}`;
    return this.http.put(url, data, { observe: "response" });
  }

  deleteAssetPaperImage(assetId: number, paperId: number, mediaId: number) {
    const url = `${environment.apiUrl}/assets/${assetId}/legal-papers/${paperId}/gallery/${mediaId}`;
    return this.http.delete(url, { observe: "response" });
  }
}

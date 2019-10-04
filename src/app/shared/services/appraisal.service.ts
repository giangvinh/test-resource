import { ISearchFee, IContractSearch, IAppraisalPrincipal } from "../models";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { IPaging } from "../models/common";
import { IContractFee } from "../models";

const APPRAISAL_URL = environment.apiUrl + "/contracts";

@Injectable({
  providedIn: "root"
})
export class AppraisalService {
  constructor(private http: HttpClient) {}

  public getAppraisalFiles(
    searchData: IContractSearch,
    currentPage: number = 1,
    pageSize: number = 10
  ): Observable<IPaging<IAppraisalPrincipal>> {
    let queryParams = `${APPRAISAL_URL}?page=${currentPage}&size=${pageSize}&keyword=${searchData.keyword}&status=${searchData.status}`;
    if (searchData.from) {
      queryParams = `${queryParams}&from=${searchData.from}`;
    }
    if (searchData.to) {
      queryParams = `${queryParams}&to=${searchData.to}`;
    }

    return this.http.get<IPaging<IAppraisalPrincipal>>(queryParams);
  }

  getIncome(contractId: number) {
    const url = environment.apiUrl + "/incomes/" + contractId;
    return this.http.get<IContractFee>(url);
  }

  updateFee(contractId: number, data: IContractFee) {
    return this.http.put(`${APPRAISAL_URL}/${contractId}`, data, {
      observe: "response"
    });
  }
}

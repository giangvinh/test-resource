import { ISearchFee } from "./../models";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { IPaging } from "../models/common";
import { IContractFee } from "../models";

const FEE_URL = environment.apiUrl + "/incomes";

@Injectable({
  providedIn: "root",
})
export class ContractFeeService {
  constructor(private http: HttpClient) {}

  getList(page: number = 1, size: number = 10): Observable<IPaging<IContractFee>> {
    return this.http.get<IPaging<IContractFee>>(`${FEE_URL}?page=${page}&size=${size}`);
  }

  public getFees(
    currentPage: number = 1,
    pageSize: number = 10,
    searchData: ISearchFee
  ): Observable<IPaging<IContractFee>> {
    let queryParams =
      `${FEE_URL}?page=${currentPage}&size=${pageSize}&keyword=${searchData.keyword}` +
      `&debt=${searchData.inDebt}&commission=${searchData.commission}&invoice=${searchData.invoice}`;
    if (searchData.fromDate) {
      queryParams = `${queryParams}&from=${searchData.fromDate}`;
    }
    if (searchData.toDate) {
      queryParams = `${queryParams}&to=${searchData.toDate}`;
    }

    return this.http.get<IPaging<IContractFee>>(queryParams);
  }

  getIncome(contractId: number) {
    const url = environment.apiUrl + "/incomes/" + contractId;
    return this.http.get<IContractFee>(url);
  }

  updateFee(contractId: number, data: IContractFee) {
    return this.http.put(`${FEE_URL}/${contractId}`, data, { observe: "response" });
  }
}

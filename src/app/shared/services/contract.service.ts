import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { IContractSearch, IPaging, IContractSales } from "../models";

const CONTRACT_URL = environment.apiUrl + "/contracts";

@Injectable({
  providedIn: "root",
})
export class ContractService {
  constructor(private http: HttpClient) {}

  getListForSale(searchData: IContractSearch, page: number, pageSize: number) {
    const searchUrl = `${CONTRACT_URL}/sales?keyword=${searchData.keyword}&from=${searchData.from}&to=${searchData.to}&status=${searchData.status}&page=${page}&size=${pageSize}`;
    return this.http.get<IPaging<IContractSales>>(searchUrl);
  }

  addContract(data: any): Observable<HttpResponse<Object>> {
    const createContractUrl = `${CONTRACT_URL}/sales`;
    return this.http.post(createContractUrl, data, { observe: "response" });
  }

  updateContract(data) {
    const updateContractUrl = `${CONTRACT_URL}/${data.id}`;
    return this.http.put(updateContractUrl, data, { observe: "response" });
  }

  getContractForSale(id: number) {
    const getContractUrl = `${CONTRACT_URL}/${id}`;
    return this.http.get<IContractSales>(getContractUrl);
  }
}

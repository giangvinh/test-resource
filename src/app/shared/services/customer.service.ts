import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getOrgs(keyword: string) {
    const url = `${environment.apiUrl}/orgs/search`;
    return this.http.get<ICustomerOrg[]>(url);
  }
  getOrg(id: number) {
    const url = `${environment.apiUrl}/orgs/${id}`;
    return this.http.get<ICustomerOrg>(url);
  }

  getCustomers(keyword: string, isReferer: boolean, orgId?: number) {
    const url = `${environment.apiUrl}/customers/search?isReferer=${isReferer}&orgId=${orgId}`;
    return this.http.get<ICustomer[]>(url);
  }

  getCustomer(id: number) {
    const url = `${environment.apiUrl}/customers/${id}`;
    return this.http.get<ICustomer>(url);
  }
}

export interface ICustomerOrg {
  id: number;
  name: string;
  address: string;
  taxCode: string;
  phoneNumber: string;
}

export interface ICustomer {
  id: number;
  orgId: number;
  name: string;
  email: string;
  phoneNumber: string;
  doB?: Date;
  orgName: string;
}

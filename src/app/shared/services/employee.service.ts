import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { IPaging, IEmployee } from "../models";
import { debounceTime } from "rxjs/operators";

const USERS_URL = environment.apiUrl + "/users";
const USERS_BY_ROLES_URL = environment.apiUrl + "/users/by-roles";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  constructor(private http: HttpClient, private router: Router) {}

  public postEmployee(emp: any): Observable<any> {
    return this.http.post(USERS_URL, emp);
  }

  public updateEmployee(emp: any): Observable<any> {
    return this.http.put(`${USERS_URL}/${emp.id}`, emp);
  }

  public deleteEmployee(emp: any): Observable<any> {
    return this.http.delete(`${USERS_URL}/${emp.id}`);
  }

  public getEmployeeById(id: number): Observable<IEmployee> {
    return this.http
      .get<IEmployee>(`${USERS_URL}/${id}`)
      .pipe(debounceTime(1000));
  }

  public getEmployees(
    currentPage: number = 1,
    pageSize: number = 10,
    branchId: number = -1,
    departmentId: number = -1,
    positionId: number = -1,
    keyword: string = "",
    isLocked: boolean = null
  ): Observable<IPaging<IEmployee>> {
    debugger;
    let queryParams = `${USERS_URL}?page=${currentPage}&size=${pageSize}`;
    if (branchId !== -1) {
      queryParams = `${queryParams}&branch=${branchId}`;
    }
    if (departmentId !== -1) {
      queryParams = `${queryParams}&department=${departmentId}`;
    }
    if (positionId !== -1) {
      queryParams = `${queryParams}&position=${positionId}`;
    }
    if (keyword) {
      queryParams = `${queryParams}&q=${keyword}`;
    }

    if (isLocked !== null) {
      queryParams = `${queryParams}&locked=${isLocked}`;
    }

    return this.http.get<IPaging<IEmployee>>(queryParams);
  }

  public getUsersRolesTDV(
    currentPage: number = 1,
    pageSize: number = 10,
    keyword: string = ""
  ) {
    let queryParams = `${USERS_URL}?roles=40&page=${currentPage}&size=${pageSize}`;
    if (keyword) {
      queryParams = `${queryParams}&keyword=${keyword}`;
    }
    return this.http.get<IPaging<IEmployee>>(queryParams);
  }
}

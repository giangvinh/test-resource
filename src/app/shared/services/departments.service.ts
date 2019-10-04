import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICommonInfo, IBranch } from "../models";
import { environment } from "src/environments/environment";
import { take, share, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
const POSITIONS_URL = environment.apiUrl + "/positions/";
const BRANCHES_URL = environment.apiUrl + "/branches";
const DEPARTMENTS_URL = environment.apiUrl + "/departments";
/**
 * @description
 * @class
 */
@Injectable({
  providedIn: "root",
})
export class DepartmentService {
  private cachedPositions: ICommonInfo[] = null;
  private cachedDepartments: ICommonInfo[];
  private cachedBranches: IBranch[];

  private observablePositions: Observable<ICommonInfo[]> = null;
  private observableDepartments: Observable<ICommonInfo[]> = null;
  private observableBranches: Observable<IBranch[]> = null;

  constructor(private http: HttpClient) {}

  public getPositions(): Observable<ICommonInfo[]> {
    if (this.cachedPositions) {
      return of(this.cachedPositions);
    }
    if (this.observablePositions) {
      return this.observablePositions;
    }
    this.observablePositions = this.http.get<ICommonInfo[]>(POSITIONS_URL).pipe(
      take(1),
      map(positions => {
        this.cachedPositions = positions;
        return positions;
      }),
      share()
    );
    return this.observablePositions;
  }

  public getDepartments() {
    if (this.cachedDepartments) {
      return of(this.cachedDepartments);
    }
    if (this.observableDepartments) {
      return this.observableDepartments;
    }
    this.observableDepartments = this.http.get<ICommonInfo[]>(DEPARTMENTS_URL).pipe(
      take(1),
      map(departments => {
        this.cachedDepartments = departments;
        return departments;
      }),
      share()
    );
    return this.observableDepartments;
  }

  public getBranches() {
    if (this.cachedBranches) {
      return of(this.cachedBranches);
    }
    if (this.observableBranches) {
      return this.observableBranches;
    }
    this.observableBranches = this.http.get<IBranch[]>(BRANCHES_URL).pipe(
      take(1),
      map(branches => {
        this.cachedBranches = branches;
        return branches;
      }),
      share()
    );
    return this.observableBranches;
  }
}

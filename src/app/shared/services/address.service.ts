import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IAddressDetail } from "../models";
import { take, map, share } from "rxjs/operators";
import { Observable, of } from "rxjs";

const CITY_URL = environment.apiUrl + "/states/";
const DISTRICTS_URL = environment.apiUrl + "/districts/";
const WARDS_URL = environment.apiUrl + "/wards/";

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: "root",
})
export class AddressService {
  private cachedStates: IAddressDetail[] = null;
  private observableStates: Observable<IAddressDetail[]> = null;
  private cachedDistricts: IAddressDetail[] = null;
  private observableDistricts: Observable<IAddressDetail[]> = null;
  private cachedWards: IAddressDetail[] = null;
  private observableWards: Observable<IAddressDetail[]> = null;

  constructor(private http: HttpClient) {}

  public getCitiesOrStates(): Observable<IAddressDetail[]> {
    if (this.cachedStates) {
      return of(this.cachedStates);
    }
    if (this.observableStates) {
      return this.observableStates;
    }
    this.observableStates = this.http.get<IAddressDetail[]>(CITY_URL).pipe(
      take(1),
      map(states => {
        this.cachedStates = states;
        return states;
      }),
      share()
    );
    return this.observableStates;
  }

  public getDistricts() {
    if (this.cachedDistricts) {
      return of(this.cachedDistricts);
    }
    if (this.observableDistricts) {
      return this.observableDistricts;
    }
    this.observableDistricts = this.http.get<IAddressDetail[]>(DISTRICTS_URL).pipe(
      take(1),
      map(districts => {
        this.cachedDistricts = districts;
        return districts;
      }),
      share()
    );
    return this.observableDistricts;
  }

  public getWards() {
    if (this.cachedWards) {
      return of(this.cachedWards);
    }
    if (this.observableWards) {
      return this.observableWards;
    }
    this.observableWards = this.http.get<IAddressDetail[]>(WARDS_URL).pipe(
      take(1),
      map(wards => {
        this.cachedWards = wards;
        return wards;
      }),
      share()
    );
    return this.observableWards;
  }

  public async getDistrictByStateId(id: number): Promise<IAddressDetail[]> {
    const districts = await this.getDistricts().toPromise();
    return districts.filter(x => x.parentId === id);
  }

  public async getWardByDistrictId(id: number): Promise<IAddressDetail[]> {
    const wards = await this.getWards().toPromise();
    return wards.filter(x => x.parentId === id);
  }
}

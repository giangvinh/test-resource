import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { IStringInfo } from "src/app/shared/models";
import { Observable } from "rxjs";
const ROLES_URL = environment.apiUrl + "/roles/";
const REGISTER_URL = environment.apiUrl + "/account/register/";
const CHANGE_ROLE_URL = environment.apiUrl + "/account/change-role/";
const CHANGE_PASS_URL = environment.apiUrl + "/account/change-password/";
const SETLOCK_URL = environment.apiUrl + "/account/set-lock/";
@Injectable({
  providedIn: "root"
})
export class RoleService {
  constructor(private http: HttpClient) {}

  public getRoles(): Observable<IStringInfo[]> {
    return this.http.get<IStringInfo[]>(ROLES_URL);
  }

  public register(data: any) {
    return this.http.post(REGISTER_URL, data);
  }

  public changeRole(data: any) {
    return this.http.put(CHANGE_ROLE_URL, data);
  }

  public changePass(data: any) {
    return this.http.put(CHANGE_PASS_URL, data);
  }

  public setlock(data: any) {
    return this.http.put(SETLOCK_URL, data);
  }
}

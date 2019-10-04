import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

const MENU_SECTIONS_URL = environment.apiUrl + "/menus/";

@Injectable({
  providedIn: "root"
})
export class MenuService {
  constructor(private http: HttpClient, private router: Router) {}

  getMenuSections(): Observable<IMenuSection[]> {
    return this.http.get<IMenuSection[]>(MENU_SECTIONS_URL);
  }
}

export interface IMenuSection {
  order: number;
  title: string;
  iconClasses: string;
  menus: IMenu[];
}

export interface IMenu {
  order: number;
  name: string;
  iconClasses: string;
  path: string;
  description: string;
}

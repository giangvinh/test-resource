import { Component } from "@angular/core";
import { MenuService, IMenuSection } from "../../shared/services/menu.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent {
  isExpanded = false;
  public menuSections$: Observable<IMenuSection[]>;

  constructor(private menuService: MenuService) {}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}

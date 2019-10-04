import { Component, HostListener, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { EmployeeService } from "./shared/services/employee.service";
import { AddressService, DepartmentService } from "./shared/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "app";
  // userActivity;

  // userInactive: Subject<any> = new Subject();
  constructor(private addressService: AddressService, private departmentService: DepartmentService) {
    // this.setTimeout();
    // this.userInactive.subscribe(() => console.log('user has been inactive for 3s'));
  }

  ngOnInit() {}
  public onRouterOutletActivate(event: any) {
    this.title = event.title;
  }
  // setTimeout() {
  //   this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3000);
  // }

  // @HostListener('window:mousemove')
  // @HostListener('document:keyup', ['$event'])
  // @HostListener('document:click', ['$event'])
  // @HostListener('document:wheel', ['$event'])
  // refreshUserState() {
  //   clearTimeout(this.userActivity);
  //   this.setTimeout();
  // }
}

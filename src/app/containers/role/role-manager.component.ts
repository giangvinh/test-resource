import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatDialog, PageEvent } from "@angular/material";
import { EButtonType, ISearchEmp, IPagingInfo, ICommonInfo, IBranch } from "src/app/shared/models";
import { EmployeeService, DepartmentService, RoleService, SnackbarService } from "src/app/shared/services";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { CommonDialogComponent } from "src/app/components";

@Component({
  selector: "app-role-manager",
  templateUrl: "./role-manager.component.html",
  styleUrls: ["./role-manager.component.scss"]
})
export class RoleManagerComponent implements OnInit {
  title = "Quản lý quyền";
  displayedColumns: string[] = [
    "name",
    "headquarters",
    "department",
    "position",
    "phone",
    "email",
    "roleName",
    "operation"
  ];
  dataSource: Object[] = [];
  EButtonType = EButtonType;
  empSearchField: ISearchEmp = {
    isLocked: false,
    branchId: -1,
    positionId: -1,
    departmentId: -1,
    keyword: ""
  };
  paging: IPagingInfo = {
    total: 0,
    page: 1,
    size: 10,
    pageSizeOptions: [5, 10, 20, 50]
  };

  operation = "Mở khóa";

  public listPositions: ICommonInfo[];
  public listDepartments: ICommonInfo[];
  public listBranches: IBranch[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private roleService: RoleService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit() {
    this.updateList();
    this.departmentService.getDepartments().subscribe(p => (this.listDepartments = p));
    this.departmentService.getPositions().subscribe(p => (this.listPositions = p));
    this.departmentService.getBranches().subscribe(p => (this.listBranches = p));
  }

  public updateList($event: PageEvent = <PageEvent>{ pageIndex: 0, pageSize: 10 }): void {
    this.employeeService.getEmployees($event.pageIndex + 1, $event.pageSize).subscribe(data => {
      this.dataSource = data.items;
      this.paging = <IPagingInfo>{
        page: $event.pageIndex,
        size: $event.pageSize,
        total: data.total,
        pageSizeOptions: this.paging.pageSizeOptions
      };
    });
  }

  public createAccount(empId: number, name: string, email: string): void {
    const dialogRef = this.dialog.open(CreateAccountComponent, {
      width: "500px",
      data: {
        id: empId,
        name: name,
        email: email
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSearch();
      }
    });
  }

  public edit(empId: number, name: string, email: string, userId: string, roleId: string) {
    const dialogRef = this.dialog.open(CreateAccountComponent, {
      width: "500px",
      data: {
        id: empId,
        name: name,
        email: email,
        userId: userId,
        roleId: roleId,
        type: "role"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSearch();
      }
    });
  }

  public changePass(empId: number, name: string, email: string, userId: string, roleId: string) {
    const dialogRef = this.dialog.open(CreateAccountComponent, {
      width: "500px",
      data: {
        id: empId,
        name: name,
        email: email,
        userId: userId,
        roleId: roleId,
        type: "pass"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onSearch();
      }
    });
  }
  public setlock(empId: number, name: string, userId: string, locked: boolean): void {
    const title = locked ? `Khóa` : `Mở khóa`;
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: "400px",
      data: {
        name: `${title} tài khoản nhân viên ${name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const model = {
          userId: userId,
          employeeId: empId,
          isLocked: locked
        };
        this.roleService.setlock(model).subscribe(() => {
          this.onSearch();
          this.snackBar.open(`${title} tài khoản thành công!`);
        });
      }
    });
  }

  public onSearch() {
    this.employeeService
      .getEmployees(
        this.paging.page,
        this.paging.size,
        this.empSearchField.branchId,
        this.empSearchField.departmentId,
        this.empSearchField.positionId,
        this.empSearchField.keyword,
        this.empSearchField.isLocked
      )
      .subscribe(data => {
        this.dataSource = data.items;
        this.paging = <IPagingInfo>{
          page: this.paging.page,
          size: this.paging.size,
          total: data.total,
          pageSizeOptions: this.paging.pageSizeOptions
        };
      });
  }
}

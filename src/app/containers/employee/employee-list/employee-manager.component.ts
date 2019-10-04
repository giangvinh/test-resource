import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatDialog, PageEvent } from "@angular/material";
import { EButtonType, ICommonInfo } from "src/app/shared/models/share.model";
import { CommonDialogComponent } from "src/app/components/common-dialog/common-dialog.component";
import { DefinePasswordDialogComponent } from "src/app/components/define-password-dialog/define-password-dialog.component";
import { CreateUserDialogComponent } from "src/app/containers/employee/create-user-dialog/create-user-dialog.component";
import { EmployeeService, DepartmentService } from "src/app/shared/services";
import { IPagingInfo, ISearchEmp, IBranch } from "src/app/shared/models";

@Component({
  selector: "app-employee-manager",
  templateUrl: "./employee-manager.component.html",
  styleUrls: ["./employee-manager.component.scss"]
})
export class EmployeeManagerComponent implements OnInit {
  title = "Quản lý nhân sự";
  displayedColumns: string[] = [
    "name",
    "headquarters",
    "department",
    "position",
    "phone",
    "email",
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
    private departmentService: DepartmentService
  ) {}

  public ngOnInit(): void {
    // this.updateList();
    // this.departmentService.getDepartments().subscribe(p => (this.listDepartments = p));
    // this.departmentService.getPositions().subscribe(p => (this.listPositions = p));
    // this.departmentService.getBranches().subscribe(p => (this.listBranches = p));
  }

  public updateList($event: PageEvent = <PageEvent>{ pageIndex: 0, pageSize: 10 }): void {
    debugger;
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

  public reload(): void {
    this.updateList(<PageEvent>{
      pageIndex: this.paging.page,
      pageSize: this.paging.size
    });
  }

  public openDialog(btnType: EButtonType, element: any): void {
    switch (btnType) {
      case EButtonType.Delete:
        this.operation = "XÓA";
        break;
      case EButtonType.Lock:
        this.operation = "KHÓA";
        break;
      case EButtonType.Unlock:
        this.operation = "MỞ KHÓA";
        break;
      default:
        this.operation = "XÓA";
        break;
    }
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: "250px",
      data: {
        name: `${this.operation} nhân viên ${element.fullName}`,
        data: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (element) {
        this.employeeService.deleteEmployee(element).subscribe(() => this.reload());
      }
    });
  }

  public openDefineDialog(modalType: boolean): void {
    const dialogRef = this.dialog.open(DefinePasswordDialogComponent, {
      width: "600px",
      height: "300px",
      data: { type: modalType, name: "Nguyễn Văn A" }
    });

    dialogRef.afterClosed().subscribe(password => {
      console.log("password");
    });
  }

  public createUser(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      height: "90%",
      data: {
        type: true
      }
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.reload();
    });
  }

  public edit(id: number): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      height: "90%",
      data: {
        type: false,
        data: id
      }
    });

    dialogRef.afterClosed().subscribe(password => {
      console.log("password");
    });
  }

  public delete(id: number): void {
    this.employeeService.deleteEmployee(id);
  }

  public onFindEmp(): void {
    this.employeeService
      .getEmployees(
        1,
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
          page: 1,
          size: this.paging.size,
          total: data.total,
          pageSizeOptions: this.paging.pageSizeOptions
        };
      });
  }
}

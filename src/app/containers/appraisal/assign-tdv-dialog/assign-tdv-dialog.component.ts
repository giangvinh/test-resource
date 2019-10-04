import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, PageEvent } from "@angular/material";
import { DialogData } from "src/app/shared/models/share.model";
import { FormControl } from "@angular/forms";
import { IPagingInfo, IEmployee, IAssignEmp } from "src/app/shared/models";
import { EmployeeService } from "src/app/shared/services";

@Component({
  selector: "app-assign-tdv-dialog",
  templateUrl: "./assign-tdv-dialog.component.html",
  styleUrls: ["./assign-tdv-dialog.component.scss"]
})
export class AssignTdvDialogComponent implements OnInit {
  public type: boolean;
  public title: string;
  public content: string;
  public btnName: string;
  public checked: false;
  public keyword = "";
  public assignEmp: IAssignEmp = {
    empIds: [],
    assignDate: ""
  };
  formDate = new FormControl(new Date());

  displayedColumns: string[] = ["operation", "fullName", "processing"];
  paging: IPagingInfo = {
    total: 0,
    page: 1,
    size: 10,
    pageSizeOptions: [5, 10, 20, 50]
  };
  dataSource: IEmployee[] = [];

  constructor(
    public dialogRef: MatDialogRef<AssignTdvDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.updateList();
  }

  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close();
  }

  updateList($event: PageEvent = <PageEvent>{ pageIndex: 0, pageSize: 10 }) {
    this.employeeService
      .getUsersRolesTDV($event.pageIndex + 1, $event.pageSize, this.keyword)
      .subscribe(data => {
        debugger;
        this.dataSource = data.items;
        this.initLoadedEmp(this.dataSource);
        this.paging = <IPagingInfo>{
          page: $event.pageIndex,
          size: $event.pageSize,
          total: data.total,
          pageSizeOptions: this.paging.pageSizeOptions
        };
      });
    return false;
  }

  initLoadedEmp(emps: IEmployee[]) {
    let newEmpId = emps[0].id;
    if (
      !this.assignEmp.empIds ||
      !this.assignEmp.empIds.some(x => x.id === newEmpId)
    ) {
      emps.map(x => {
        this.assignEmp.empIds = [
          ...this.assignEmp.empIds,
          { id: x.id, selected: false }
        ];
      });
    }
    this.dataSource.map(x => {
      this.assignEmp.empIds.map(y => {
        if (x.id === y.id) {
          x.selected = y.selected;
        }
      });
    });
  }

  onSelectUser(event: any, id: number) {
    this.assignEmp.empIds.map(x => {
      if (x.id === id) {
        x.selected = event.checked;
      }
    });
    console.log(this.assignEmp.empIds);
  }
}

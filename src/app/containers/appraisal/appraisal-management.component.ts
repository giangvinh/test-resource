import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { MatPaginator, MatDialog, PageEvent } from "@angular/material";
import {
  EButtonType,
  IPagingInfo,
  IAppraisalPrincipal,
  IContractSearch,
  ServiceResult
} from "src/app/shared/models";
import { AppraisalService } from "src/app/shared/services";
import { AssignTdvDialogComponent } from "..";

@Component({
  selector: "app-appraisal-management",
  templateUrl: "./appraisal-management.component.html",
  styleUrls: ["./appraisal-management.component.scss"]
})
export class AppraisalManagementComponent implements OnInit {
  formDate = new FormControl(new Date());
  toDate = new FormControl(new Date().toISOString());
  searchForm: FormGroup;
  displayedColumns: string[] = [
    "contractKey",
    "orgName",
    "appraisalPurpose",
    "valuers",
    "reassignedDate",
    "assignedDate",
    "dueDate",
    "status",
    "operation"
  ];
  dataSource: IAppraisalPrincipal[] = [];
  paging: IPagingInfo = {
    total: 0,
    page: 1,
    size: 10,
    pageSizeOptions: [5, 10, 20, 50]
  };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public fb: FormBuilder, public appraisal: AppraisalService) {}

  ngOnInit() {
    this.buildSearchForm();
    this.updateList();
  }

  buildSearchForm() {
    this.searchForm = this.fb.group({
      keyword: [""],
      from: [new Date()],
      to: [new Date()],
      status: [null]
    });
  }

  updateList($event: PageEvent = <PageEvent>{ pageIndex: 0, pageSize: 10 }) {
    const searchData = this.getSearchData();
    this.appraisal.getAppraisalFiles(searchData, $event.pageIndex + 1, $event.pageSize).subscribe(data => {
      this.dataSource = data.items;
      this.paging = <IPagingInfo>{
        page: $event.pageIndex,
        size: $event.pageSize,
        total: data.total,
        pageSizeOptions: this.paging.pageSizeOptions
      };
    });
    return false;
  }

  getSearchData(): IContractSearch {
    return <IContractSearch>{
      keyword: this.searchForm.value.keyword,
      from: this.searchForm.value.from ? this.searchForm.value.from.toISOString() : null,
      to: this.searchForm.value.to ? this.searchForm.value.to.toISOString() : null,
      status: this.searchForm.value.status
    };
  }

  reload() {
    this.updateList(<PageEvent>{ pageIndex: this.paging.page, pageSize: this.paging.size });
  }

  assignAppraisers(element: any = null) {
    const dialogRef = this.dialog.open(AssignTdvDialogComponent, {
      width: "50%",
      maxHeight: "95%vh",
      data: { data: element }
    });

    dialogRef.afterClosed().subscribe((data: ServiceResult) => {
      this.updateList();
    });
  }
}

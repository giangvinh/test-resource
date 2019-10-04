import { Component, OnInit } from "@angular/core";
import { MatDialog, PageEvent } from "@angular/material";
import {
  IPagingInfo,
  IContractSales,
  ServiceResult,
  EButtonType,
  IContractSearch,
} from "../../../shared/models";
import { ContractService } from "../../../shared/services";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AddContractDialogComponent, AssetsComponent } from "../..";

@Component({
  selector: "app-contract-management-sales",
  templateUrl: "./contract-management-sales.component.html",
  styleUrls: ["./contract-management-sales.component.scss"],
})
export class ContractManagementSalesComponent implements OnInit {
  title = "Quản lý Hợp đồng Thẩm định";
  displayedColumns: string[] = [
    "contractKey",
    "contractCode",
    "orgName",
    "customerName",
    "purpose",
    "numberOfAssets",
    "status",
    "operation",
  ];
  searchForm: FormGroup;
  paging: IPagingInfo = {
    total: 0,
    page: 1,
    size: 10,
    pageSizeOptions: [5, 10, 20, 50],
  };
  dataSource: IContractSales[] = [];

  EButtonType = EButtonType;

  constructor(public dialog: MatDialog, public fb: FormBuilder, public contractService: ContractService) {}

  ngOnInit() {
    this.buildSearchForm();
    this.updateList();
  }

  buildSearchForm() {
    this.searchForm = this.fb.group({
      keyword: [""],
      from: [new Date()],
      to: [new Date()],
      status: [null],
    });
  }

  getSearchData(): IContractSearch {
    return <IContractSearch>{
      keyword: this.searchForm.value.keyword,
      from: this.searchForm.value.from ? this.searchForm.value.from.toISOString() : null,
      to: this.searchForm.value.to ? this.searchForm.value.to.toISOString() : null,
      status: this.searchForm.value.status,
    };
  }

  updateList($event: PageEvent = <PageEvent>{ pageIndex: 0, pageSize: 10 }) {
    const searchData = this.getSearchData();
    this.contractService.getListForSale(searchData, $event.pageIndex + 1, $event.pageSize).subscribe(data => {
      this.dataSource = data.items;
      this.paging = <IPagingInfo>{
        page: $event.pageIndex,
        size: $event.pageSize,
        total: data.total,
        pageSizeOptions: this.paging.pageSizeOptions,
      };
    });
    return false;
  }

  reload() {
    this.updateList(<PageEvent>{ pageIndex: this.paging.page, pageSize: this.paging.size });
  }

  addContract() {
    const dialogRef = this.dialog.open(AddContractDialogComponent, {
      height: "90%",
      data: {},
    });

    dialogRef.afterClosed().subscribe((data: ServiceResult) => {
      this.updateList();
    });
  }

  editContract(contract: IContractSales) {
    const dialogRef = this.dialog.open(AddContractDialogComponent, {
      height: "90%",
      data: {
        data: contract.id,
      },
    });

    dialogRef.afterClosed().subscribe((data: ServiceResult) => {
      this.updateList();
    });
  }

  assets(contract: IContractSales) {
    const dialogRef = this.dialog.open(AssetsComponent, {
      height: "90%",
      width: "80%",
      data: {
        data: {
          contractId: contract.id,
          contractKey: contract.contractKey,
          canEdit: contract.canEdit,
        },
      },
    });

    dialogRef.afterClosed().subscribe((data: ServiceResult) => {
      this.updateList();
    });
  }
}

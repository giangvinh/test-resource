import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatDialog, PageEvent } from "@angular/material";
import {
  EButtonType,
  IPagingInfo,
  IContractFee,
  EInDebtFilter,
  ECommissionFilter,
  EInvoiceFilter,
  ISearchFee,
} from "src/app/shared/models";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ContractFeeService, SnackbarService } from "src/app/shared/services";
import { UpdateFeeDialogComponent } from "..";

@Component({
  selector: "app-fee-managment",
  templateUrl: "./fee-managment.component.html",
  styleUrls: ["./fee-managment.component.scss"],
})
export class FeeManagmentComponent implements OnInit {
  title = "Quản lý phí hợp đồng";
  public displayedColumns: string[] = [
    "contractKey",
    "customerName",
    "invoiceValue",
    "afterTaxValue",
    "paid",
    "inDebt",
    "invoiceCode",
    "commission",
    "contracted",
    "note",
    "operations",
  ];
  public paging: IPagingInfo = {
    total: 0,
    page: 1,
    size: 10,
    pageSizeOptions: [5, 10, 20, 50],
  };
  public EInDebtFilter = EInDebtFilter;
  public EInvoiceFilter = EInvoiceFilter;
  public ECommissionFilter = ECommissionFilter;

  dataSource: IContractFee[] = [];
  EButtonType = EButtonType;
  searchForm: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    public feeService: ContractFeeService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit() {
    this.buildSearchForm();
    this.updateList();
  }

  public buildSearchForm(): void {
    this.searchForm = this.fb.group({
      commission: [null],
      inDebt: [null],
      invoice: [null],
      keyword: [""],
      fromDate: [null],
      toDate: [null],
    });
  }

  updateList($event: PageEvent = <PageEvent>{ pageIndex: 0, pageSize: 10 }) {
    const searchData = this.getSearchData();
    this.feeService.getFees($event.pageIndex + 1, $event.pageSize, searchData).subscribe(data => {
      this.dataSource = data.items;
      this.paging = <IPagingInfo>{
        page: $event.pageIndex,
        size: $event.pageSize,
        total: data.total,
        pageSizeOptions: this.paging.pageSizeOptions,
      };
    });
  }

  updateFee(row: any) {
    const dialogRef = this.dialog.open(UpdateFeeDialogComponent, {
      data: { data: row },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isSuccess) {
          this.snackBar.open("Cập nhật chi phí thành công!");
          this.updateList();
        }
      }
    });
  }
  private getSearchData() {
    return <ISearchFee>{
      inDebt: this.searchForm.value.inDebt,
      commission: this.searchForm.value.commission,
      invoice: this.searchForm.value.invoice,
      keyword: this.searchForm.value.keyword,
      fromDate: this.searchForm.value.fromDate ? this.searchForm.value.fromDate.toISOString() : null,
      toDate: this.searchForm.value.toDate ? this.searchForm.value.toDate.toISOString() : null,
    };
  }
}

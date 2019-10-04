import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { CustomerService, ICustomer } from "src/app/shared/services";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData } from "src/app/shared/models";

@Component({
  selector: "app-search-for-customer",
  templateUrl: "./search-for-customer.component.html",
  styleUrls: ["./search-for-customer.component.scss"],
})
export class SearchForCustomerComponent implements OnInit {
  displayedColumns: string[] = ["name", "operation"];
  searchForm: FormGroup;
  dataSource = [];
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<SearchForCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      keyword: [null],
    });
  }

  updateList() {
    const keyword = this.searchForm.value.keyword;
    this.customerService
      .getCustomers(keyword, this.data.data.isReferer, this.data.data.orgId)
      .subscribe(data => {
        this.dataSource = data;
      });
  }

  select(e: ICustomer) {
    this.dialogRef.close(e);
  }
}

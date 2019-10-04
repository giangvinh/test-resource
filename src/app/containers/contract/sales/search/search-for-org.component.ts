import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { CustomerService } from "src/app/shared/services";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-search-for-org",
  templateUrl: "./search-for-org.component.html",
  styleUrls: ["./search-for-org.component.scss"],
})
export class SearchForOrgComponent implements OnInit {
  displayedColumns: string[] = ["name", "taxCode", "operation"];
  searchForm: FormGroup;
  dataSource = [];
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<SearchForOrgComponent>
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      keyword: [null],
    });
  }

  updateList() {
    const keyword = this.searchForm.value.keyword;
    this.customerService.getOrgs(keyword).subscribe(data => {
      this.dataSource = data;
    });
  }

  select(e) {
    this.dialogRef.close(e);
  }
}

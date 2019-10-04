import { Component, OnInit } from "@angular/core";
import { ContractService, AssetService } from "src/app/shared/services";
import { IContractSales, IAsset } from "src/app/shared/models";
import { ActivatedRoute } from "@angular/router";
import { getAddressText } from "src/app/shared/methods";

@Component({
  selector: "app-contract-valuation",
  templateUrl: "./contract-valuation.component.html",
  styleUrls: ["./contract-valuation.component.scss"],
})
export class ContractValuationComponent implements OnInit {
  contractId?: number = null;
  contract: IContractSales;
  assets: IAsset[];

  title = "Xử lý hợp đồng Thẩm định";
  getAddress = getAddressText;

  constructor(
    private route: ActivatedRoute,
    private contractService: ContractService,
    private assetService: AssetService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contractId = +params["id"];
      if (this.contractId && !this.contract) {
        this.contractService.getContractForSale(this.contractId).subscribe(contract => {
          this.contract = contract;
          this.assetService.getAssets(this.contractId).subscribe(assets => (this.assets = assets));
        });
      }
    });
  }
}

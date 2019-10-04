import { mergeMap, map } from "rxjs/operators";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder } from "@angular/forms";
import { DialogData, IAsset, ServiceResult, IAddress, IAssetPaper } from "src/app/shared/models";
import { ContractService, AssetService } from "src/app/shared/services";
import { AddAssetComponent, AddAssetLegalPaperComponent } from "src/app/containers";
import { CommonDialogComponent, FileUploadComponent } from "src/app/components";
import { forkJoin } from "rxjs";
import { environment } from "src/environments/environment";
import { getAddressText } from "src/app/shared/methods";

@Component({
  selector: "app-assets",
  templateUrl: "./assets.component.html",
  styleUrls: ["./assets.component.scss"],
})
export class AssetsComponent implements OnInit {
  assets: IAsset[];
  serverUrl = environment.serverUrl;
  getAddress = getAddressText;
  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AssetsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private contractService: ContractService,
    private assetService: AssetService
  ) {}
  private get contractId() {
    return this.data.data.contractId;
  }

  private get canEdit() {
    return this.data.data.canEdit;
  }

  public get contractKey() {
    return this.data.data.contractKey;
  }
  ngOnInit() {
    this.load();
  }

  load() {
    this.assetService
      .getAssets(this.contractId)
      .pipe(
        mergeMap(assets =>
          forkJoin(
            assets.map(asset => {
              return this.assetService.getAssetPapers(asset.id).pipe(
                map(papers => {
                  asset.legalPapers = papers;
                  return asset;
                })
              );
            })
          )
        )
      )
      .subscribe(assets => (this.assets = assets));
  }

  reloadAsset(assetId: number) {
    this.assetService
      .getAsset(this.contractId, assetId)
      .pipe(
        mergeMap(asset =>
          this.assetService.getAssetPapers(asset.id).pipe(
            map(papers => {
              asset.legalPapers = papers;
              return asset;
            })
          )
        )
      )
      .subscribe(asset => {
        const index = this.assets.findIndex(x => x.id === asset.id);
        if (index > -1) {
          this.assets[index] = asset;
        }
      });
  }

  addAsset() {
    const dialogRef = this.dialog.open(AddAssetComponent, {
      maxHeight: "90%",
      width: "550px",
      data: {
        data: {
          contractId: this.contractId,
          contractKey: this.contractKey,
        },
      },
    });

    dialogRef.afterClosed().subscribe((data: ServiceResult) => {
      this.load();
    });
  }

  editAsset(assetId: number) {
    const dialogRef = this.dialog.open(AddAssetComponent, {
      maxHeight: "90%",
      width: "550px",
      data: {
        data: {
          contractId: this.contractId,
          contractKey: this.contractKey,
          assetId: assetId,
        },
      },
    });

    dialogRef.afterClosed().subscribe((data: ServiceResult) => {
      this.reloadAsset(assetId);
    });
  }
  deleteAsset(asset: IAsset) {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: "350px",
      data: {
        name: `[${asset.name}]`,
        operation: "XÓA",
        component: "tài sản thẩm định",
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assetService.deleteAsset(this.contractId, asset.id).subscribe(r => {
          if (r.status === 204) {
            this.load();
          }
        });
      }
    });
  }

  addAssetLegalPaper(asset: IAsset) {
    const dialogRef = this.dialog.open(AddAssetLegalPaperComponent, {
      maxHeight: "90%",
      width: "550px",
      data: {
        data: {
          assetId: asset.id,
          assetName: asset.name,
        },
      },
    });

    dialogRef.afterClosed().subscribe((data: ServiceResult) => {
      this.reloadAsset(asset.id);
    });
  }

  reloadPaper(assetId: number, paperId: number) {
    this.assetService.getAssetPaper(assetId, paperId).subscribe(paper => {
      const assetIndex = this.assets.findIndex(x => x.id === assetId);
      const asset = this.assets[assetIndex];
      const paperIndex = asset.legalPapers.findIndex(x => x.id === paperId);
      if (paperIndex > -1) {
        asset.legalPapers[paperIndex] = paper;
      }
    });
  }
  editAssetPaper(asset: IAsset, paper: IAssetPaper) {
    const dialogRef = this.dialog.open(AddAssetLegalPaperComponent, {
      maxHeight: "90%",
      width: "550px",
      data: {
        data: {
          assetId: asset.id,
          assetName: asset.name,
          paperId: paper.id,
        },
      },
    });

    dialogRef.afterClosed().subscribe((data: ServiceResult) => {
      this.reloadPaper(asset.id, paper.id);
    });
  }

  deleteAssetPaper(asset: IAsset, paper: IAssetPaper) {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: "350px",
      data: {
        name: `[${paper.description}]`,
        operation: "XÓA",
        component: "pháp lý",
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assetService.deleteLegalPaper(asset.id, paper.id).subscribe(r => this.reloadAsset(asset.id));
      }
    });
  }

  addAssetPaperImages(asset: IAsset, paper: IAssetPaper) {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      maxHeight: "80%",
      width: "750px",
      data: {
        data: {
          uploadUrl: `${environment.apiUrl}/assets/${asset.id}/legal-papers/${paper.id}/gallery`,
        },
      },
    });

    dialogRef.afterClosed().subscribe((data: ServiceResult) => {
      this.reloadPaper(asset.id, paper.id);
    });
  }

  deleteAssetPaperImage(assetId: number, paperId: number, mediaId: number) {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: "350px",
      data: {
        name: "",
        operation: "XÓA",
        component: "hình ảnh pháp lý",
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assetService
          .deleteAssetPaperImage(assetId, paperId, mediaId)
          .subscribe(r => this.reloadPaper(assetId, paperId));
      }
    });
  }
}

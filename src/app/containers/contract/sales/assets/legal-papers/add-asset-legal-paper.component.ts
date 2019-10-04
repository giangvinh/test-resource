import { Component, OnInit, Inject } from "@angular/core";
import { AssetService } from "src/app/shared/services";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DialogData, IAssetPaper } from "src/app/shared/models";

@Component({
  selector: "app-add-asset-legal-paper",
  templateUrl: "./add-asset-legal-paper.component.html",
  styleUrls: ["./add-asset-legal-paper.component.scss"],
})
export class AddAssetLegalPaperComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddAssetLegalPaperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private assetService: AssetService
  ) {}
  private get assetName() {
    return this.data.data.assetName;
  }

  private get assetId() {
    return +this.data.data.assetId;
  }

  private get isEdit() {
    return !!this.data.data.paperId;
  }

  private get paperId(): number {
    return this.data.data.paperId;
  }
  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.buildForm();
    if (this.isEdit) {
      this.assetService.getAssetPaper(this.assetId, this.paperId).subscribe(paper => this.updateForm(paper));
    }
  }
  updateForm(paper: IAssetPaper) {
    this.formGroup.setValue({
      description: paper.description,
    });
  }
  buildForm() {
    this.formGroup = this.fb.group({
      description: [null, Validators.required],
    });
  }

  onSave() {
    if (!this.formGroup.invalid) {
      const data: IAssetPaper = <IAssetPaper>{
        id: this.paperId,
        description: this.formGroup.value.description,
      };

      if (this.isEdit) {
        this.assetService.updateLegalPaper(this.assetId, data).subscribe(r => {
          if (r.status === 204) {
            this.dialogRef.close(true);
          }
        });
      } else {
        this.assetService.addLegalPaper(this.assetId, data).subscribe(r => {
          if (r.status === 204) {
            this.dialogRef.close(true);
          }
        });
      }
    }
  }
}

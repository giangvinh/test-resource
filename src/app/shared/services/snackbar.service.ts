import { Injectable } from "@angular/core";
import { MatSnackBarConfig, MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class SnackbarService {
  private snackBarConfig: MatSnackBarConfig = {
    duration: 5000,
    verticalPosition: "top",
    horizontalPosition: "right"
  };
  constructor(private _snackBar: MatSnackBar) {}

  public open(text: string) {
    this._snackBar.open(text, "Tắt", this.snackBarConfig);
  }
}

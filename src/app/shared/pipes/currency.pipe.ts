import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "currencyMaskPipe" })
export class CurrenCyMaskPipe implements PipeTransform {
  amount: any;

  transform(value: any, args?: any): any {
    if (value == null) return 0;
    let amount = String(value).replace(/,/g, "");

    const beforePoint = amount.split(".")[0];
    let integers = "";
    if (typeof beforePoint !== "undefined") {
      integers = beforePoint.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
    }
    const afterPoint = amount.split(".")[1];
    let decimals = "";
    if (typeof afterPoint !== "undefined") {
      decimals = afterPoint.replace(/\D+/g, "");
    }
    if (decimals.length > 2) {
      decimals = decimals.slice(0, 2);
    }
    amount = integers;
    if (typeof afterPoint === "string") {
      amount += ".";
    }
    if (decimals.length > 0) {
      amount += decimals;
    }

    return amount;
  }
}

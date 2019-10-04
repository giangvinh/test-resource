import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "enumsBoolToArray" })
export class EnumBooleanToArrayPipe implements PipeTransform {
  transform(value): Object {
    return Object.keys(value).map(o => {
      return { id: value[o], name: o };
    });
  }
}

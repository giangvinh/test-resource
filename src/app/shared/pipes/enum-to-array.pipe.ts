import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "enumsToArray" })
export class EnumToArrayPipe implements PipeTransform {
  transform(value): Object {
    return Object.keys(value)
      .filter(e => !isNaN(+e))
      .map(o => {
        return { id: +o, name: value[o] };
      });
  }
}

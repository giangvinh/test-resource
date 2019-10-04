import { FormControl } from "@angular/forms";
import { of } from "rxjs";
import { IAddress } from "../models";

export function ipValidator(c: FormControl) {
  const IP_REGEXP = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;

  return IP_REGEXP.test(c.value)
    ? of(null)
    : of({
        ipValidator: {
          valid: false,
        },
      });
}

export function getAddressText(address: IAddress) {
  if (address) {
    let text = "";
    if (address.addressLine1) {
      text += ` ${address.addressLine1}`;
    }

    if (address.ward) {
      if (text !== "") {
        text += ", ";
      }
      text += ` ${address.ward}`;
    }

    if (address.district) {
      if (text !== "") {
        text += ", ";
      }
      text += ` ${address.district}`;
    }

    if (address.city) {
      if (text !== "") {
        text += ", ";
      }
      text += ` ${address.city}`;
    }
    return text.trim();
  }
  return "";
}

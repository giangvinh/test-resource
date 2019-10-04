import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
  AfterViewChecked
} from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-multiselect",
  templateUrl: "./autocomplete-select.component.html",
  styleUrls: ["./autocomplete-select.component.scss"]
})
export class AutocompleteSelectComponent
  implements OnChanges, AfterViewChecked {
  @Input()
  class = "";
  @Input()
  placeholder = "";
  @Input()
  options = [];
  @Input()
  disabled = false;
  @Input()
  display = "display";
  @Input()
  value;
  @Input()
  formControl = new FormControl();
  @Input()
  errorMsg = "Field is required";
  @Input()
  showErrorMsg = false;
  @Input()
  selectedOptions = null;
  @Input()
  multiple = true;
  @Input()
  label;

  // New Options
  @Input()
  labelCount = 1;
  @Input()
  appearance = "standard";

  @Output()
  selectionChange: EventEmitter<any> = new EventEmitter();

  @ViewChild("selectElem", { static: false }) selectElem;

  filteredOptions: Array<any> = [];
  selectedValue: Array<any> = [];
  selectAllChecked = false;
  displayString = "";
  constructor() {}

  ngOnChanges() {
    this.filteredOptions = this.options;
    if (this.selectedOptions) {
      this.selectedValue = this.selectedOptions;
    } else if (this.formControl.value) {
      this.selectedValue = this.formControl.value;
    }
    // if (this.formControl) {
    // }
    this.onDisplayString();
  }

  ngAfterViewChecked() {
    // if (this.formControl.value) {
    //   this.onSelectionChange(this.formControl.value);
    // }
  }

  toggleDropdown() {
    this.selectElem.toggle();
  }

  toggleSelectAll = function(val) {
    if (val.checked) {
      this.filteredOptions.forEach(option => {
        if (!this.selectedValue.includes(option.id)) {
          this.selectedValue = this.selectedValue.concat([option.id]);
        }
      });
    } else {
      const filteredValues = this.getFilteredOptionsValues();
      this.selectedValue = this.selectedValue.filter(
        item => !filteredValues.includes(item)
      );
    }
    this.selectionChange.emit(this.selectedValue);
  };

  filterItem(value) {
    if (!value) {
      this.selectedValue = [-1];
    }
    this.filteredOptions = this.options.filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    this.selectAllChecked = true;
    this.filteredOptions.forEach(item => {
      debugger;
      if (!this.selectedValue.includes(item.name)) {
        this.selectAllChecked = false;
      }
    });
  }

  hideOption(option) {
    return !(this.filteredOptions.indexOf(option) > -1);
  }

  // Returns plain strings array of filtered values
  getFilteredOptionsValues() {
    if (this.filteredOptions) {
      const filteredValues = [];
      this.filteredOptions.forEach(option => {
        filteredValues.push(option.id);
      });
      return filteredValues;
    }
  }

  async onDisplayString() {
    this.displayString = "";
    if (this.selectedValue || this.selectedValue.length) {
      let displayOption = [];
      if (this.multiple) {
        // Multi select display
        for (let i = 0; i < this.labelCount; i++) {
          displayOption[i] = await this.options.filter(
            option => option.id === this.selectedValue[i]
          )[0];
        }
        if (displayOption.length) {
          for (let i = 0; i < displayOption.length; i++) {
            this.displayString += displayOption[i].name + ",";
          }
          this.displayString = await this.displayString.slice(0, -1);
          if (this.selectedValue.length > 1) {
            this.displayString += await ` (+${this.selectedValue.length -
              this.labelCount} others)`;
          }
        }
      } else {
        // Single select display
        if (this.options) {
          displayOption = await this.options.filter(
            option => option.id === this.selectedValue
          );
          if (displayOption.length) {
            this.displayString = await displayOption[0].name;
          }
        }
      }
    }
    // return this.displayString;
  }

  async onSelectionChange(val) {
    if (!val.value) {
      return;
    }

    const filteredValues = this.getFilteredOptionsValues();
    let count = 0;
    if (this.multiple) {
      this.selectedValue.filter(item => {
        if (filteredValues.includes(item)) {
          count++;
        }
      });
      this.selectAllChecked = count === this.filteredOptions.length;
    }
    this.selectedValue = val.value;
    await this.onDisplayString();
    await this.selectionChange.emit(this.selectedValue);
  }
}

import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher } from "@angular/material";
import { DialogData, IStringInfo } from "src/app/shared/models";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  ValidationErrors
} from "@angular/forms";
import { RoleService, SnackbarService } from "src/app/shared/services";
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get("password").value === formGroup.get("confirmPassword").value) {
    return null;
  } else {
    return { passwordMismatch: true };
  }
};
@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.scss"]
})
export class CreateAccountComponent implements OnInit {
  public formGroup: FormGroup;
  // emailFormControl = new FormControl("", [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  public roles: IStringInfo[];
  public isCreate = false;
  public isUpdateRole = false;
  public disableEmail = false;
  constructor(
    public dialogRef: MatDialogRef<CreateAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public roleService: RoleService,
    private snackBar: SnackbarService
  ) {
    dialogRef.disableClose = true;
    if (this.data.email) {
      this.disableEmail = true;
    }
    if (!this.data.userId) {
      this.isCreate = true;
      this.createForm();
    } else if (this.data.type === "role") {
      this.isUpdateRole = true;
      this.updateRoleForm();
    } else {
      this.updatePassForm();
    }
  }

  ngOnInit() {
    if (this.isCreate || this.isUpdateRole) {
      this.roleService.getRoles().subscribe(roles => {
        this.roles = roles;
        if (this.isUpdateRole) {
          this.formGroup.setValue({
            email: this.data.email,
            roleId: this.data.roleId
          });
        }
      });
    } else {
      // change pass
      this.formGroup.setValue({
        email: this.data.email,
        password: "",
        confirmPassword: ""
      });
    }
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  createForm() {
    this.formGroup = this.fb.group(
      {
        email: [{ value: "", disabled: this.disableEmail }, [Validators.required, Validators.email]],
        password: ["", [Validators.required]],
        confirmPassword: [""],
        roleId: ["", [Validators.required]]
      },
      { validator: this.checkPasswords }
    );
  }

  updateRoleForm() {
    this.formGroup = this.fb.group({
      email: [{ value: "", disabled: true }, [Validators.required, Validators.email]],
      roleId: ["", [Validators.required]]
    });
  }

  updatePassForm() {
    this.formGroup = this.fb.group(
      {
        email: [{ value: "", disabled: true }, [Validators.required, Validators.email]],
        password: ["", [Validators.required]],
        confirmPassword: [""]
      },
      { validator: this.checkPasswords }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    const formValue = this.formGroup.value;
    const model = {
      email: formValue.email,
      password: formValue.password,
      roleId: formValue.roleId,
      employeeId: this.data.id,
      userId: this.data.userId
    };
    if (this.isCreate) {
      this.roleService.register(model).subscribe(x => {
        this.dialogRef.close(true);
        this.snackBar.open("Tạo tài khoản thành công!");
      });
    } else if (this.isUpdateRole) {
      this.roleService.changeRole(model).subscribe(x => {
        this.dialogRef.close(true);
        this.snackBar.open("Thay đổi quyền thành công!");
      });
    } else {
      this.roleService.changePass(model).subscribe(x => {
        this.dialogRef.close(true);
        this.snackBar.open("Đổi mật khẩu thành công!");
      });
    }
  }
}

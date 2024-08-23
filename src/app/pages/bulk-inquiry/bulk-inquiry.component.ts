import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-bulk-inquiry',
  templateUrl: './bulk-inquiry.component.html',
  styleUrls: ['./bulk-inquiry.component.scss']
})
export class BulkInquiryComponent {
  inquiryForm!: FormGroup;
  inquiry: any = {};

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private loaderService: LoaderService
  ) {
    this.createForm();
  }

  createForm() {
    this.inquiryForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, this.phoneValidator]],
      email: ['', [Validators.required, Validators.email]],
      quantity: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Only digits allowed
      product: ['', Validators.required],
      message: ['']
    });
  }

  phoneValidator(control: AbstractControl): { [key: string]: any } | null {
    const phonePattern = /^\d{10}$/; // Custom phone number pattern
    if (control.value && !phonePattern.test(control.value)) {
      return { 'invalidPhone': true };
    }
    return null;
  }

  submitForm() {
    if (this.inquiryForm.valid) {
      const formData = this.inquiryForm.value;
      this.categoryService.addEnquiry(formData).subscribe(
        (res: any) => {
          this.userService.toast.snackbarError(res.message);
          this.inquiryForm.reset();
        },
        (error: any) => {
          this.loaderService.hideLoading();
          this.userService.toast.snackbarError(error.error.error);
        }
      );
    }
  }
}

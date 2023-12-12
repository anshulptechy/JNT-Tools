import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CouponService } from 'src/app/couponServices/coupon.service';
import { CouponsModel } from 'src/app/models/couponModels';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  // Form to handle coupon updates
  updateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    private fb: FormBuilder,
    private serve: CouponService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateForm = this.fb.group({
      // Initialize the form with default values and validators
      id: [0],
      couponCode: ['string'],
      couponName: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      discount: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      discountType: ['', [Validators.required]],
      supabaseUserId: ['', [Validators.required]],
    }, { validator: this.dateValidator.bind(this) });
  }

  ngOnInit() {
    // Populate the form with existing coupon data on component initialization
    this.populateForm();
  }

  // Fetch coupon details by ID and populate the form with the data
  populateForm() {
    this.serve.GetCouponById(this.data.data.id).subscribe((result: CouponsModel) => {
      this.updateForm.patchValue({
        id: result.id,
        couponCode: result.couponCode,
        couponName: result.couponName,
        description: result.description,
        discount: result.discount,
        quantity: result.quantity,
        startDate: this.formatDate(result.startDate),
        endDate: this.formatDate(result.endDate),
        discountType: result.discountType || '',
        supabaseUserId: result.supabaseUserId,
      });
    });
  }

  onUpdateClick(data1: CouponsModel) {
    if (this.updateForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid',
        text: ' *Please validate all the required fields!',
      });
      return;
    }
    else {
      // Set the ID for the coupon data and send an update request to the server
      data1.id = this.data.data.id;
      this.serve.updateCoupon(data1).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  onCancelClick() {
    this.dialogRef.close(true);
  }

  // Helper method to format dates in 'YYYY-MM-DD' format
  private formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  dateValidator(form: FormGroup) {
    const startDateControl = form.get('startDate');
    const endDateControl = form.get('endDate');

    if (startDateControl && endDateControl) {
      const startDate = startDateControl.value;
      const endDate = endDateControl.value;

      // Get the current date in the local timezone
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      // Parse the selected start date and end date strings to Date objects
      const parsedStartDate = startDate ? new Date(startDate) : null;
      const parsedEndDate = endDate ? new Date(endDate) : null;

      // Check if the selected start date is in the past or the same as the current date
      if (parsedStartDate && parsedStartDate < currentDate) {
        startDateControl.setErrors({ pastDateError: 'Please choose a date from today or later.' });
      } else {
        startDateControl.setErrors(null);
      }

      // Check if the end date is before the start date or the same as the start date
      if (parsedStartDate && parsedEndDate && parsedEndDate < parsedStartDate) {
        endDateControl.setErrors({ dateError: 'End date must be after the start date.' });
      } else {
        endDateControl.setErrors(null);
      }
    }
  }


}

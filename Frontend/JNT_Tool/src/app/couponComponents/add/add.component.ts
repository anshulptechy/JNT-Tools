import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CouponService } from 'src/app/couponServices/coupon.service';
import { SupabaseService } from 'src/app/supabase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  couponForm: FormGroup;
  loading: boolean = false;
  submitted = false;
  

  // Constructor to initialize the component
  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    private fb: FormBuilder,
    private serve: CouponService,
    private _supaService: SupabaseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  )  {
    this.couponForm = this.fb.group({
      // Initializing the form with default values and validation rules
      id: [0],
      couponCode: ['string'],
      couponName: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      discount: ['', [Validators.required, Validators.min(0),Validators.max(1000000)]],
      quantity: ['', [Validators.required, Validators.min(1),Validators.max(100000)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      discountType: ['', [Validators.required]],
      supabaseUserId: ['', [Validators.required]],
    }, { validator: this.dateValidator.bind(this) }); 
  }

  async ngOnInit() {
    // Fetch user details when the dashboard component initializes
    const userDetails = await this._supaService.getUserDetails();
    if (userDetails) {
      const userId = this._supaService.extractUserId(userDetails);
      this.couponForm.patchValue({
        supabaseUserId: userId,
      });
    }
  }

  async onSaveClick() {
    this.submitted = true;

    // Mark all form controls as touched to trigger the display of error messages
    Object.values(this.couponForm.controls).forEach(control => {
      control.markAsTouched();
    });

    if (this.couponForm.invalid) {
      return;
    }

    try {
      const formData = this.couponForm.value;
      await this.serve.addCoupon(formData);
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'Coupons added successfully',
      });
    } catch (error) {
      console.error('Error adding coupon:', error);
    } finally {
      this.dialogRef.close(this.couponForm);
      this.loading = false;
    }
  }

  // Method called when the "Cancel" button is clicked
  onCancelClick() {
    this.dialogRef.close(true);
  }
  isSaveButtonDisabled(): boolean {

    return this.couponForm.invalid;
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
  
      // Check if the start date is provided
      if (!parsedStartDate) {
        startDateControl.setErrors({ requiredError: 'Start date is required.' });
      } else {
        // Check if the selected start date is in the past or the same as the current date
        if (parsedStartDate < currentDate) {
          startDateControl.setErrors({ pastDateError: 'Please choose a date from today or later.' });
        } else {
          startDateControl.setErrors(null);
        }
      }
  
      // Check if the end date is provided
      if (!parsedEndDate) {
        endDateControl.setErrors({ requiredError: 'End date is required.' });
      } else {
        // Check if the end date is before the start date or the same as the start date
        if (parsedStartDate && parsedEndDate < parsedStartDate) {
          endDateControl.setErrors({ dateError: 'End date must be after the start date.' });
        } else {
          endDateControl.setErrors(null);
        }
      }
    }
  }
  handleMaxLengthError(control: AbstractControl, maxLength: number): void {
    if (control?.hasError('maxlength')) {
      control.markAsTouched();
     
    }
  }
}
  
  

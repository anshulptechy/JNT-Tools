import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  // Constructor to initialize the component
  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    private fb: FormBuilder,
    private serve: CouponService,
    private _supaService: SupabaseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.couponForm = this.fb.group({
      // Initializing the form with default values and validation rules
      id: [0],
      couponCode: ['string'],
      couponName: ['', [Validators.required]],
      description: [''],
      discount: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      discountType: ['', [Validators.required]],
      supabaseUserId: ['', [Validators.required]]
    });
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
    if (this.couponForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid',
        text: ' *Please fill in all the required fields!',
      });
      // return;
    }
    else {
      try {
        // Get form data and add the coupon using the CouponService
        const formData = this.couponForm.value;
        await this.serve.addCoupon(formData);
        this.dialogRef.close(true);
      } catch (error) {
        console.error('Error adding coupon:', error);
      } finally {
        this.dialogRef.close(this.couponForm);
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: 'coupons added successfully',
        });
      }
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

      if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
        endDateControl.setErrors({ dateError: true });
      } else {
        endDateControl.setErrors(null);
      }
    }
  }

}

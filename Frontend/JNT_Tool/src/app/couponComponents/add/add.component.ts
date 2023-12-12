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
  )  {
    this.couponForm = this.fb.group({
      // Initializing the form with default values and validation rules
      id: [0],
      couponCode: ['string'],
      couponName: ['', [Validators.required]],
      description: [''],
      discount: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      discountType: ['', [Validators.required]],
      supabaseUserId: ['', [Validators.required]],
    }, { validator: this.dateValidator.bind(this) }); // Add custom validator to the form group
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
        title: 'Invalid Form',
        text: ' *Please Fill in all the required fields!',
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
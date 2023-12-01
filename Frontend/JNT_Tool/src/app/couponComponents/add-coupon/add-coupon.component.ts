import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent {
  couponForm: FormGroup;
  loading: boolean = false;

  // Constructor to initialize the component
  constructor(
    public dialogRef: MatDialogRef<AddCouponComponent>,
    private fb: FormBuilder,
    private serve: CouponService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.couponForm = this.fb.group({
      // Initializing the form with default values and validation rules
      id: [0],
      couponCode: ['string'],
      couponName: ['', [Validators.required]],
      description: [''],
      discount: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      discountType: ['', [Validators.required]],
      supabaseUserId: ['', [Validators.required]]
    });
  }


  async ngOnInit() {
    // Fetch user details when the dashboard component initializes
    // const userDetails = await this._supaService.getUserDetails();
    // if (userDetails) {
    //   const userId = this._supaService.extractUserId(userDetails);
    //   this.couponForm.patchValue({
    //     supabaseUserId: userId,
    //   });
    // }
  }

  async onSaveClick() {
  
    try {
      // Get form data and add the coupon using the CouponService
      // const formData = this.couponForm.value;
      // await this.serve.addCoupon(formData);
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Error adding coupon:', error);
    } finally {
      this.dialogRef.close();
      this.loading = false;
    }
  }

  // Method called when the "Cancel" button is clicked
  onCancelClick() {
    this.dialogRef.close(true);
  }

}

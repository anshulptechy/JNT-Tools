import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CouponsModel } from 'src/app/models/couponModel';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent {
showDeleteConfirmation = false;
  couponIdToDelete!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'couponCode', 'couponName', 'description', 'discount', 'startDate', 'endDate', 'discountType', 'actions'];
  dataSource!: MatTableDataSource<CouponsModel>;

  constructor(
    private _dialog: MatDialog,
    private _couponService: CouponService
  ) { }

  ngOnInit(): void {
    // this.getCouponsList();
  }

  confirmDelete() {
    // this._couponService.deleteCoupons(this.couponIdToDelete).subscribe({
    //   next: (res) => {
    //     this._coreService.openSnackBar('Deletetion', 'Done');
    //     this.getCouponsList();
    //     this.showDeleteConfirmation = false;
    //   },
    //   error: console.log,
    // });
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
  }
}

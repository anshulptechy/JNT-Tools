import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CouponsModel } from 'src/app/models/couponModels';
import { AddComponent } from '../add/add.component';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent {
  showDeleteConfirmation = false;
  couponIdToDelete!: number;
  
  displayedColumns: string[] = ['id', 'couponCode', 'couponName', 'description', 'discount', 'startDate', 'endDate', 'discountType', 'actions'];
  dataSource!: MatTableDataSource<CouponsModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
   private _couponService: CouponService
  ) { }
  cancelDelete() {
    this.showDeleteConfirmation = false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getCouponsList() {
    try {
      const response = await this._couponService.getCouponsListForUser();
      response.subscribe({
        next: (res: CouponsModel[]) => {
          this.dataSource = new MatTableDataSource(res as CouponsModel[]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error: any) => {
          console.log('Error getting coupons:', error);
        },
      });
    } catch (error) {
      console.error('Error getting coupons:', error);
    }
  }

  deleteCoupons(id: number) {
    this.couponIdToDelete = id;
    this.showDeleteConfirmation = true;
  }
  openAddForm() {
    const DialogRef = this._dialog.open(AddComponent);
    DialogRef.afterClosed().subscribe({
      next: (val: CouponsModel) => {
        if (val) {
          this.getCouponsList();
        }
      }
    });
  }
}

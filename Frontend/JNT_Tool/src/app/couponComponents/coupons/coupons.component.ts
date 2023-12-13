import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CouponsModel } from 'src/app/models/couponModels';
import { AddComponent } from '../add/add.component';
import { CouponService } from 'src/app/couponServices/coupon.service';
import { EditComponent } from '../edit/edit.component';


@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  showDeleteConfirmation = false;
  couponIdToDelete!: number;

  displayedColumns: string[] = ['couponCode', 'couponName', 'description', 'discount', 'startDate', 'endDate', 'discountType', 'actions'];
  dataSource!: MatTableDataSource<CouponsModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _couponService: CouponService,

  ) { }

  ngOnInit(): void {
    this.getCouponsList();
  }

  deleteCoupons(id: number) {
    this.couponIdToDelete = id;
    this.showDeleteConfirmation = true;
  }

  confirmDelete() {
    this._couponService.deleteCoupons(this.couponIdToDelete).subscribe({
      next: (res) => {
        this.getCouponsList();
        this.showDeleteConfirmation = false;
        // Check if the data source is empty, then clear the table
        if (this.dataSource.data.length === 1) {
          this.dataSource.data = [];
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          window.location.reload();
        }
      },
      error: console.log,
    });
  }






  cancelDelete() {
    this.showDeleteConfirmation = false;
  }

  openAddForm() {
    const dialogRef = this._dialog.open(AddComponent);

    dialogRef.afterClosed().subscribe(async (val: CouponsModel) => {
      if (val) {
        // Fetch the updated list of coupons after adding a new coupon
        await this.getCouponsList();
      }
    });
  }



  async getCouponsList() {
    try {
      const response = await this._couponService.getCouponsListForUser();
      response.subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res as CouponsModel[]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          console.log('Error getting coupons:', error);
        },
      });
    } catch (error) {
      console.error('Error getting coupons:', error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(project: any): void {
    const dialogRef = this._dialog.open(EditComponent, {
      width: '600px',
      data: {
        data: project,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getCouponsList();
    });
  }


breakWords(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    const words = text.split(' ');
    let currentLength = 0;
    let result = '';

    for (const word of words) {
      currentLength += word.length + 1; // Add 1 for the space between words
      if (currentLength > maxLength) {
        result += '\n' + word + ' ';
        currentLength = word.length + 1;
      } else {
        result += word + ' ';
      }
    }

    return result.trim(); // Remove trailing space
  } else {
    return text;
  }
}


}

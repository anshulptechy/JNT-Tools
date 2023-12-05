import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupabaseService } from '../supabase.service';



@Injectable({
  providedIn: 'root'
})
export class CouponService {
  constructor(private _http: HttpClient, private supaService: SupabaseService) { }

  async addCoupon(data: any): Promise<Observable<any>> { debugger;
    try {
      debugger;
      const userDetails = await this.supaService.getUserDetails();
      const supabaseUserId = userDetails?.id;

      if (supabaseUserId) {
         console.log(data);
        const response = await this._http.post('https://localhost:7126/api/Coupon/Create', data);
        console.log('data'+data);
        return new Observable(observer => {
          observer.next(response);
          observer.complete();
        });
      } else {
        throw new Error('Error adding coupon: User details not available');
      }
    } catch (error) {
      console.error('Error adding coupon:', error);
      throw error; 
    }
  }

  updateCoupon(data: any): Observable<any> {
    return this._http.put(`https://localhost:7126/api/Coupon/Update`, data);
  }

  async getCouponsListForUser(): Promise<Observable<any>> { debugger;
    try {
      debugger;
      const userDetails = await this.supaService.getUserDetails();
      const supabaseUserId = userDetails?.id;

      if (supabaseUserId) {
        console.log(supabaseUserId);
        const url = `https://localhost:7126/api/Coupon/${supabaseUserId}`;
        return this._http.get(url);
      } else {
        throw new Error('Error getting coupons: User details not available');
      }
    } catch (error) {
      console.error('Error getting coupons:', error);
      throw error;
    }
  }

  GetCouponById(id: number): Observable<any> {
    return this._http.get(`https://localhost:7126/api/Coupon/GetBy/${id}`);
  }

  deleteCoupons(id: number): Observable<any> {
    return this._http.delete(`https://localhost:7126/api/Coupon/Delete/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {


  constructor(private http: HttpClient) { }


  getAllAttendenceWithManagement() {
    return this.http.get('https://localhost:7126/api/Attendence/GetAllManagementAndAttendance');
  }
  getAllEmployees(data:string) {
    return this.http.get(`https://localhost:7126/api/Attendence/GetAllFirstNamesByTenant?tenantName=${data}`);
  }
  getMonths() {
    return this.http.get('https://localhost:7126/api/Attendence/months');
  }
  getbyMonthName(month: string) {
    return this.http.get(`https://localhost:7126/api/Attendence/GetAllManagementAndAttendanceByMonth?monthName=${month}`);
  }

}


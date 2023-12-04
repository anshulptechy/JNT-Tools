import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }


  getAllData() {
    return this.http.get('https://localhost:7290/api/Attendence/GetAllAttendence');
  }

  getAllEmployees() {
    return this.http.get('https://localhost:7290/api/Attendence/all-Employeenames');
  }
  getMonths() {
    return this.http.get('https://localhost:7290/api/Attendence/all-months');
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'https://localhost:7126';

  constructor(private http: HttpClient) { }


  getAllAttendenceWithManagement() {
    return this.http.get(`${this.apiUrl}/api/Attendence/GetAllAttendenceWithManagement`);
  }
  getAllEmployees() {
    return this.http.get('https://localhost:7126/api/Values/GetAllTenant');
  }
  getMonths() {
    return this.http.get('https://localhost:7290/api/Attendence/all-months');
  }

}

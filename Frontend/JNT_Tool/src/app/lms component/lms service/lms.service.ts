import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeaveApplication } from '../model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LmsService {

  constructor(private http: HttpClient) { }
  
  getManagerNames(): Observable<string[]> {
    return this.http.get<string[]>('https://localhost:7126/api/LeaveManagementSystem/GetManagerNames');
  }
  submitLeaveApplication(leaveApplicationData: LeaveApplication) {
    return this.http.post(`https://localhost:7126/api/LeaveManagementSystem/CreateApplyLeave`, leaveApplicationData);
  }
  
  getLeaveStatusByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7126/api/LeaveManagementSystem/employee/${userId}`);
  }
  
  updateLeaveApplication(leaveApplication: LeaveApplication): Observable<any> {
   
    return this.http.put(`https://localhost:7126/api/LeaveManagementSystem/UpdateApplyLeave`
    , leaveApplication, { responseType: 'text' });
  }
  deleteLeave(id: number) {
    // Assuming your API expects a DELETE request to delete a leave entry
  
    return this.http.delete(`https://localhost:7126/api/LeaveManagementSystem/DeleteApplyLeave/${id}`);
  }
  updateLeaveStatus(userId: number, startDate: string, endDate: string, status: string): Observable<any> {
    const url = `https://localhost:7126/api/LeaveManagementSystem/UpdateLeaveStatus/${userId}/${startDate}/${endDate}/${status}`;
    // Send a PUT request to the API with an empty body
    return this.http.put(url, {});
  }
  
  GetLeaveStatusForManagedUsers(managerName: string): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7126/api/LeaveManagementSystem/GetLeaveStatusForManagedUsers/${managerName}`);
  }
}

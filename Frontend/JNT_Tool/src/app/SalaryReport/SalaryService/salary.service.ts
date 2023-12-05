import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private baseUrl = 'https://localhost:7126/api/Report'; 

  constructor(private http: HttpClient) { }

  getMonths(): Observable<string[]> {
    const url = `${this.baseUrl}/all-months`;
    return this.http.get<string[]>(url);
  }

  getAllEmployees(): Observable<any[]> {
    const url = `https://localhost:7126/api/Salary/employee-names`;
    return this.http.get<any[]>(url);
  }

  
  getSalaryData(month: string, employeeId: number): Observable<any[]> {
    const url = `${this.baseUrl}/salary-records/${month}/${employeeId}`;
    return this.http.get<any[]>(url);
  }

}

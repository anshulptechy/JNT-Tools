import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private baseUrl = 'https://localhost:7126/api/SalaryReport';

  constructor(private http: HttpClient) { }

  getMonths(): Observable<string[]> {
    const url = `${this.baseUrl}/all-months`;
    return this.http.get<string[]>(url);
  }

  getAllEmployees(): Observable<any[]> {
    const url = `${this.baseUrl}/GetAllFirstNames`;
    return this.http.get<any[]>(url);
  }

  getSalaryData(firstName: string,salaryMonth: string): Observable<any[]> {
    const url = `${this.baseUrl}/getSalaryData/${firstName}/${salaryMonth}`;

    return this.http.get<any[]>(url);
  }
}

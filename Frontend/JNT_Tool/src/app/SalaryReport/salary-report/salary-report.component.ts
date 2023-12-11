// salary-report.component.ts
import { Component } from '@angular/core';
import { SalaryService } from '../SalaryService/salary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salary-report',
  templateUrl: './salary-report.component.html',
  styleUrls: ['./salary-report.component.css']
})
export class SalaryReportComponent {
  employeeData: any[] = [];
  showRecordOptions: boolean = true;
  selectedEmployee: any = {}; 
  selectedMonth: string = '';
  showReportOptions: boolean = true;
  showReportGrid: boolean = false;
  months: string[] = [];
  reportData: any[] = [];

  constructor(
    private router: Router,
    private employeeService: SalaryService
  ) {}

  ngOnInit(): void {
    this.loadEmployeeData();
    this.loadMonths();
  }

  loadEmployeeData() {
    this.employeeService.getAllEmployees().subscribe(
      (data: any[]) => {
        this.employeeData = data;
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  loadMonths() {
    this.employeeService.getMonths().subscribe(
      (months: string[]) => {
        this.months = months;
      },
      (error: any) => {
        console.error('Error fetching months:', error);
      }
    );
  }

  generateReport() {
    debugger;
    if (this.selectedEmployee && this.selectedMonth) {
      this.employeeService.getSalaryData(this.selectedEmployee,this.selectedMonth).subscribe(
        (data: any[]) => {
          this.reportData = data;
          this.showReportGrid = true;
        },
        (error: any) => {
          console.error('Error fetching salary data:', error);
        }
      );
    }
  }
  
  

  updateSelectedEmployee() {
    const selectedEmployee = this.employeeData.find(e => e.id === this.selectedEmployee.id);
    if (selectedEmployee) {
      this.selectedEmployee.employeeName = selectedEmployee.employeeName;
    }
  }
}

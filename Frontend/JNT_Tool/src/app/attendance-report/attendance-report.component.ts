import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AttendanceService } from '../service/attendance.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent implements OnInit {
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  employeeNames: string[] = [];
  showTable: boolean = true;
  selectedMonth: string = '';
  selectedEmployee: string = '';
  gridData: any[] = [];
  attendanceForm: FormGroup;
  showDropdown: boolean = true;

  constructor(private router: Router, private formBuilder: FormBuilder, private serve: AttendanceService) {
    this.attendanceForm = this.formBuilder.group({
      selectedMonth: [''],
      selectedEmployee: ['']
    });
  }

  ngOnInit(): void {
    this.loadEmployeeData();
    this.loadData();
  }

  loadEmployeeData() {
    const tenantName = localStorage.getItem('tenantName') || '';
    const tenantNameString = String(tenantName);

    this.serve.getAllEmployees(tenantNameString).subscribe(
      (data: any | any[]) => {
        this.employeeNames = data;
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  populateEmployeeNames() {
    this.employeeNames = Array.from(new Set(this.gridData.map(record => record.management.firstName)));
  }

  formatDate(dateTimeString: string): string {
    if (dateTimeString) {
      const date = new Date(dateTimeString);
      const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      return `${dateString} ${timeString}`;
    }
    return '';
  }

  generateMReport() {
    if (this.selectedMonth) {
      this.serve.getAllAttendenceWithManagement().subscribe((result) => {
        if (Array.isArray(result)) {
          this.gridData = result.filter((record) => {
            return record['month'].toLowerCase().trim() === this.selectedMonth.toLowerCase().trim();
          });
          this.showTable = true;
        }
      });
    } else {
      this.showTable = true;
      this.selectedEmployee = '';
      this.loadData();
    }
  }

  getbyMonthName(selectedMonth: string) {
    this.serve.getbyMonthName(selectedMonth).subscribe(
      (result) => {
        console.log(result);
        this.gridData = result as any;
        this.showTable = true;
        this.selectedEmployee = '';
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  setValueOfSelectedMonth(value: string) {
    const selectedMonthControl = this.attendanceForm.get('selectedMonth');
    if (selectedMonthControl) {
      selectedMonthControl.setValue(value);
    }
  }

  private loadData() {
    this.serve.getAllAttendenceWithManagement().subscribe((result) => {
      this.gridData = result as any;
      this.populateEmployeeNames();
      this.loadEmployeeData();
    });
  }

  generateEReport() {
    if (this.selectedEmployee) {
      this.serve.getAllAttendenceWithManagement().subscribe((result) => {
        if (Array.isArray(result)) {
          this.gridData = result.filter((record) => {
            return record.management.firstName === this.selectedEmployee;
          });
          this.showTable = true;
          this.selectedMonth = '';
          console.log("Selected Month after clearing:", this.selectedMonth);
        }
      });
    }
  }
}

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

    this.serve.getAllAttendenceWithManagement().subscribe((result) => {
      this.gridData = result as any;
      this.populateEmployeeNames();
    });
  }

  ngOnInit(): void {
    // You can add any additional initialization logic here if needed.
  }

  generateMReport() {
    if (this.selectedMonth) {
      console.log('Selected Month:', this.selectedMonth);
      this.filterGridDataByMonth();
    }
  }

 

  private populateEmployeeNames() {
    this.employeeNames = Array.from(new Set(this.gridData.map(record => record.management.firstName)));
  }

  private filterGridDataByMonth() {
    this.gridData = this.gridData.filter((record) => {
      return record['month'].toLowerCase().trim() === this.selectedMonth.toLowerCase().trim();
    });
    this.showTable = true;
    this.selectedEmployee = '';
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
        }
      });
    }
  }
}

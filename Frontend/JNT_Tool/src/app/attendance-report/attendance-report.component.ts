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
      this.serve.getAllAttendenceWithManagement().subscribe((result) => {
        console.log('All Data:', result);
        if (Array.isArray(result)) {
          this.gridData = result.filter((record) => {
            console.log('Record Month:', record['month']);
            return record['month'].toLowerCase().trim() === this.selectedMonth.toLowerCase().trim();
          });
          console.log('Filtered Data:', this.gridData);
          this.showTable = true;
          this.selectedEmployee = '';
        }
      });
    } 
    else {
      // If no month is selected, show all data
      this.showTable = true;
      this.selectedEmployee = '';
      this.serve.getAllAttendenceWithManagement().subscribe((result) => {
        this.gridData = result as any;
      });
    }
  }

  getbyMonthName(selectedMonth: string) {
    this.serve.getbyMonthName(selectedMonth).subscribe(
      
      (result) => {
        // Handle the response data as needed
        console.log('Data for selected month:', result);
        this.gridData = result as any; // Set the data to the gridData property
        this.showTable = true; // Show the table
        this.selectedEmployee = ''; 
      },
      (error) => {
        // Handle any errors
        console.error('Error:', error);
      }
    );
  }
 
  
  private populateEmployeeNames() {
    this.employeeNames = Array.from(new Set(this.gridData.map(record => record.management.firstName)));
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

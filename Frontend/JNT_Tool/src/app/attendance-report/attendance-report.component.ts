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
      // console.log(result);
      
      this.gridData = result as any;
      console.log(this.gridData);
      
      this.populateEmployeeNames();
    });
  }

  formatDate(dateTimeString: string): string {
    if (dateTimeString) {
        // Assuming date format: "2023-12-11T10:06:30.2383121"
        const date = new Date(dateTimeString);
        
        // Use { second: '2-digit' } in the options
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    return '';
}

  ngOnInit(): void {
    // You can add any additional initialization logic here if needed.
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
      this.serve.getAllAttendenceWithManagement().subscribe((result) => {
        this.gridData = result as any;
        
      });
    }
  }
  
  // Assuming `getbyMonthName` is not being used, you can remove it if unnecessary
  

  getbyMonthName(selectedMonth: string) {
    this.serve.getbyMonthName(selectedMonth).subscribe(
      
      (result) => {
        // Handle the response data as needed
        console.log( result);
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

import { Component } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  showDropdown: boolean = true;
  selectedMonth: string = '';
  selectedEmployee: string = '';
  gridData: any[] = [];
  attendanceForm: FormGroup | any;
  result: any[] = [];
 
  constructor(private router: Router,private formBuilder: FormBuilder,private serve:AttendanceService) {
    serve. getAllAttendenceWithManagement().subscribe((result)=>{
      console.log(result);
      
      this.gridData=result as any;
       console.log(this.gridData);
    });
     // Initialize your form here
  this.attendanceForm = this.formBuilder.group({
    selectedMonth: [''],
    selectedEmployee: ['']
  });
    }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
    generateMReport() {
      if (this.selectedMonth ) {
        console.log('Selected Month:', this.selectedMonth);
        this.serve. getAllAttendenceWithManagement().subscribe((result) => {
          console.log('All Data:', result);
          if (Array.isArray(result)) {
            this.gridData = result.filter((record) => {
              console.log('Record Month:', record['month']);
              return record['month'].toLowerCase().trim() === this.selectedMonth.toLowerCase().trim();
            });
            console.log('Filtered Data:', this.gridData);
            this.showTable = true;
            this.selectedEmployee='';
          }
        });
      }
    }
    generateEReport() {
      if (this.selectedEmployee) {
        this.serve.getAllAttendenceWithManagement().subscribe((result) => {
          if (Array.isArray(result)) {
            this.gridData = result.filter((record) => {
              return record['empName'] === this.selectedEmployee;
            });
            this.showTable = true;
            this.selectedMonth = '';
          }
        });
      }
    }
   
}
 
 
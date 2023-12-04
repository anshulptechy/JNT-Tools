import { Component } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { AttendanceService } from '../service/attendance.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent implements OnInit {
  months: string[] = [];
  employeeNames: string[] = [];
  selectedEmployee: string = '';
  showTable: boolean = false;
  showDropdown: boolean = false;
  selectedMonth: string = '';
  gridData: any[] = [];
  attendanceForm: FormGroup | any;
  email: string | null = null;
  firstName: string | null = null;

  constructor(private formBuilder: FormBuilder, private routes: Router, private serve: AttendanceService) {
    this.attendanceForm = this.formBuilder.group({
      selectedMonth: [''],
      selectedEmployee: ['']
    });
   
  }

  async ngOnInit(): Promise<void> {
   
    // this.fetchFirstName();
    // Populate employee dropdown with unique names
    this.serve.getAllData().subscribe((result) => {
      if (Array.isArray(result)) {
        this.employeeNames = Array.from(new Set(result.map(record => record['empName'])));
        this.months = Array.from(new Set(result.map(record => record['month'])));
      }
    });
    this.getMonths();
  }


  
  // Fetch months and employees data during component initialization
  getMonths() {
    this.serve.getMonths().subscribe(
      (result) => {
        this.months = result as any;
      },
      error => {
        console.error('Error fetching months:', error);
      }
    );
  }
  // Inside your component class
  getShortName(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.substring(0, atIndex);
    }
    return email;
  }

  // Function to generate report based on the selected month
  generateMonthReport() {
    if (this.selectedMonth) {
      this.serve.getAllData().subscribe((result) => {
        if (Array.isArray(result)) {
          const orderedMonths = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];

          this.gridData = result.filter((record) => {
            return record['month'].toLowerCase().trim() === this.selectedMonth.toLowerCase().trim();
          }).sort((a, b) => {
            return orderedMonths.indexOf(a['month']) - orderedMonths.indexOf(b['month']);
          });

          this.showTable = true;
          this.selectedEmployee = '';
        }
      });
    }
  }

  generateEmpReport() {
    if (this.selectedEmployee) {
      this.serve.getAllData().subscribe((result) => {
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

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onClick() {
    this.showTable = true;
  }
  }

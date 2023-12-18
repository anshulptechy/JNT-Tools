import { Component } from '@angular/core';
import { SalaryService } from 'src/app/SalaryReport/SalaryService/salary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})
export class HRComponent {
  isSalaryPopupOpen = false;
  salaryRecord = {
    employeeId: '',
    salaryMonth: '',
    salary: '',
    leaves: '',
    deductions: '',
    netPay: ''
  };

  employeeData: any[] = [];

  constructor(private salaryService: SalaryService) {}

  ngOnInit(): void {
    this.loadEmployeeData();

  }

  loadEmployeeData() {
    const tenantName = localStorage.getItem('tenantName') || '';
    const tenantNameString = String(tenantName);

    this.salaryService.getAllEmployees(tenantNameString).subscribe(
      (data: any[]) => {
        this.employeeData = data;
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  openSalaryPopup() {
    console.log('Opening salary popup');
    this.isSalaryPopupOpen = true;
  }

  closeSalaryPopup() {
    console.log('Closing salary popup');
    this.isSalaryPopupOpen = false;
  }

  saveSalary() {
    debugger;
    // Check if all required fields are filled
    if (
      this.salaryRecord.employeeId &&
      this.salaryRecord.salaryMonth &&
      this.salaryRecord.salary &&
      this.salaryRecord.leaves
    ) {
      // Calculate deduction and net pay based on leaves
      const leaveDeduction = this.salaryRecord.leaves ? 300 * parseInt(this.salaryRecord.leaves, 10) : 0;
      const netPay = parseInt(this.salaryRecord.salary, 10) - leaveDeduction;
  
      // Update salaryRecord with calculated values
      this.salaryRecord.deductions = leaveDeduction.toString();
      this.salaryRecord.netPay = netPay.toString();
  
      // Call the addSalaryRecord function from the service
      this.salaryService.addSalaryRecord(this.salaryRecord).subscribe(
        response => {
          this.salaryRecord = {
            employeeId: '',
            salaryMonth: '',
            salary: '',
            leaves: '',
            deductions: '',
            netPay: ''
          };
        },
        error => {
          console.error('Error adding salary record', error);
  
          // Check if the error has a response body with JSON content
          if (error.error) {
            try {
              const errorData = JSON.parse(error.error);
  
              // Display the error message to the user
              console.error('Server error:', errorData.title);
              // Perform additional actions if needed
            } catch (parseError) {
              console.error('Error parsing JSON error response', parseError);
              // Handle parsing error of error response appropriately
            }
          } else {
            
            console.error('An unexpected error occurred.');
         
          }
        }
      );
  
      
    
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Salary added successfully.',
      });
      // Close the popup
      this.closeSalaryPopup();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
      });
    }
  }

  updateDeduction() {
    // Calculate deduction based on leaves when leaves input changes
    const leaveDeduction = this.salaryRecord.leaves ? 300 * parseInt(this.salaryRecord.leaves, 10) : 0;
    this.salaryRecord.deductions = leaveDeduction.toString();

    // Update net pay based on the new deduction
    this.salaryRecord.netPay = (parseInt(this.salaryRecord.salary, 10) - leaveDeduction).toString();
  }

}

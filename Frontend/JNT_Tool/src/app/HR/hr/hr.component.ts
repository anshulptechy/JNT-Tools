import { Component } from '@angular/core';
import { SalaryService } from 'src/app/SalaryReport/SalaryService/salary.service';
import { TenantService } from 'src/app/tenant.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css'],
})
export class HRComponent {
  isSalaryPopupOpen = false;
  salaryRecord = {
    employeeId: '',
    salaryMonth: '',
    salary: '',
    leaves: '',
    deductions: '',
    netPay: '',
  };

  tenants: any[] = [];

  constructor(
    private salaryService: SalaryService,
    private tenantData: TenantService
  ) {}
  ngOnInit() {
    this.fetchTenants();
    const storedFirstName = localStorage.getItem('tenantName');
  }

  async fetchTenants() {
    const storedFirstName = localStorage.getItem('tenantName');

    // Fetch all tenants from the service
    this.tenantData.getAllTenants().subscribe((data: any) => {
      // Filter tenants based on the condition
      this.tenants = data.filter(
        (tenant: any) => tenant.tenantName === storedFirstName
      );
    });
  }

  openSalaryPopup(user : any) {
    console.log('Opening salary popup');
    this.salaryRecord.employeeId = `${user.firstName} ${user.lastName}`;
    this.isSalaryPopupOpen = true;
  }

  closeSalaryPopup() {
    console.log('Closing salary popup');
    this.salaryRecord = {
      employeeId: '',
      salaryMonth: '',
      salary: '',
      leaves: '',
      deductions: '',
      netPay: '',
    };
    this.isSalaryPopupOpen = false;
  }

  saveSalary() {
    if (
      this.salaryRecord.employeeId &&
      this.salaryRecord.salaryMonth &&
      this.salaryRecord.salary &&
      this.salaryRecord.leaves
    ) {
      const maxLeaves = 30;
      const enteredLeaves = parseInt(this.salaryRecord.leaves, 10);

      // If entered leaves exceed the maximum, set it to the maximum
      this.salaryRecord.leaves =
        enteredLeaves > maxLeaves
          ? maxLeaves.toString()
          : this.salaryRecord.leaves;

      const dailySalary = parseInt(this.salaryRecord.salary, 10) / 30;
      const leaveDeduction =
        dailySalary * parseInt(this.salaryRecord.leaves, 10);

      // Use Math.floor() to round down the values
      this.salaryRecord.deductions = Math.floor(leaveDeduction).toString();
      if (enteredLeaves === maxLeaves) {
        this.salaryRecord.netPay = '0';
      } else {
        this.salaryRecord.netPay = Math.floor(
          parseInt(this.salaryRecord.salary, 10) - leaveDeduction
        ).toString();
      }

      this.salaryService.addSalaryRecord(this.salaryRecord).subscribe(
        (response) => {
          this.salaryRecord = {
            employeeId: '',
            salaryMonth: '',
            salary: '',
            leaves: '',
            deductions: '',
            netPay: '',
          };
        },
        (error) => {
          console.error('Error adding salary record', error);

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
      this.salaryRecord = {
        employeeId: '',
        salaryMonth: '',
        salary: '',
        leaves: '',
        deductions: '',
        netPay: '',
      };
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
      });
    }
  }

  updateDeduction() {
    if (this.salaryRecord.salary && this.salaryRecord.leaves) {
      // Ensure leaves do not exceed the maximum (30)
      const maxLeaves = 30;
      const enteredLeaves = parseFloat(this.salaryRecord.leaves); // Use parseFloat to handle decimal leaves

      // If entered leaves exceed the maximum, set it to the maximum
      this.salaryRecord.leaves =
        enteredLeaves > maxLeaves
          ? maxLeaves.toString()
          : this.salaryRecord.leaves;

      const dailySalary = parseFloat(this.salaryRecord.salary) / 30;
      const leaveDeduction = dailySalary * parseFloat(this.salaryRecord.leaves);

      // Use Math.floor() to round down the values
      this.salaryRecord.deductions = Math.floor(leaveDeduction).toString();

      // Calculate net pay for fractional leaves
      if (enteredLeaves >= maxLeaves) {
        this.salaryRecord.netPay = '0';
      } else if (enteredLeaves % 1 === 0.5) {
        this.salaryRecord.netPay = Math.floor(
          parseFloat(this.salaryRecord.salary) - dailySalary / 2
        ).toString();
      } else {
        this.salaryRecord.netPay = Math.floor(
          parseFloat(this.salaryRecord.salary) - leaveDeduction
        ).toString();
      }
    }
  }
}

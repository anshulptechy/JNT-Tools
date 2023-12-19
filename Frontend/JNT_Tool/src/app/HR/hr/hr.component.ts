import { Component } from '@angular/core';
import { SalaryService } from 'src/app/SalaryReport/SalaryService/salary.service';
import { TenantService } from 'src/app/tenant.service';

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

  tenants: any[] = [];

  
  constructor(private salaryService: SalaryService, private tenantData: TenantService) {}
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
  
  
  openSalaryPopup() {
    console.log('Opening salary popup');
    this.isSalaryPopupOpen = true;
  }

  closeSalaryPopup() {
    console.log('Closing salary popup');
    this.isSalaryPopupOpen = false;
  }

  saveSalary() {

    if (
      this.salaryRecord.employeeId &&
      this.salaryRecord.salaryMonth &&
      this.salaryRecord.salary &&
      this.salaryRecord.leaves
    ) {

      const leaveDeduction = this.salaryRecord.leaves ? 300 * parseInt(this.salaryRecord.leaves, 10) : 0;
      const netPay = parseInt(this.salaryRecord.salary, 10) - leaveDeduction;

      this.salaryRecord.deductions = leaveDeduction.toString();
      this.salaryRecord.netPay = netPay.toString();
  

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

    const leaveDeduction = this.salaryRecord.leaves ? 300 * parseInt(this.salaryRecord.leaves, 10) : 0;
    this.salaryRecord.deductions = leaveDeduction.toString();
    this.salaryRecord.netPay = (parseInt(this.salaryRecord.salary, 10) - leaveDeduction).toString();
  }


}

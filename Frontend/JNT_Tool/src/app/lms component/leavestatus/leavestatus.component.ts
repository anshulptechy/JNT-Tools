import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LmsService } from '../lms service/lms.service';
import { LeaveApplication } from '../model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leavestatus',
  templateUrl: './leavestatus.component.html',
  styleUrls: ['./leavestatus.component.css']
})
export class LeavestatusComponent implements OnInit {
 

  leaveStatusData: any[] | undefined;
  leaveApplicationForm: FormGroup; 
  employeeInputType: string = 'dropdown';
  managerNames: string[] = [];
  isPopupOpen = false;
  leaveApplication: LeaveApplication = {} as LeaveApplication;
  
  
  allNames: any[] = [];

  constructor(
    private lmsService: LmsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.leaveApplicationForm = this.formBuilder.group({
      employeeInputType: ['dropdown'],
      managerName: [''],
      id: [null, Validators.required],
      userId: [null],
      employeeName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      leaveType: ['', Validators.required],
      reason: ['', [Validators.required, Validators.maxLength(150)]],
    });
  }

  submitLeaveApplication() {
    debugger;
    const userId = localStorage.getItem('id');

    if (userId !== null) {
      this.leaveApplication.status = 'Pending';
      this.leaveApplication.userId = parseInt(userId, 10);

      this.lmsService.submitLeaveApplication(this.leaveApplication).subscribe(
        (response) => {
          console.log(this.leaveApplication);

        });

      Swal.fire({
        icon: 'success',
        title: 'Applied Successful!',
        text: 'Your leave has been applied successfully.',
      });
      window.location.reload();
      this.closeLeaveApplicationPopup();

    }
  }

  ngOnInit() {
    this.getLeaveStatusByuserId();
    this.getManagerNames();
    this.getAllNames();
  }

  getLeaveStatusByuserId() {
    debugger;
    const userId = localStorage.getItem('id');

    if (userId) {
      this.lmsService.getLeaveStatusByUserId(userId).subscribe(
        (data: any[] | undefined) => {
          console.log('Leave Status Data:', data);
          this.leaveStatusData = data;
        },
        (error: any) => {
          console.error('Error fetching leave status:', error);
        }
      );
    }
  }

  getAllNames() {debugger;
    const tenantName = localStorage.getItem('tenantName') || '';
    const tenantNameString = String(tenantName); 
    this.lmsService.getAllNames(tenantName)
    .subscribe(
      names => {
        this.allNames = names;
        console.log('allNames:', this.allNames);
      },
      error => {
        console.error('Error retrieving names:', error);
      }
    );
  }

  editLeave(leave: any) {
    debugger
    const formattedStartDate = this.formatDate(leave.startDate);
    const formattedEndDate = this.formatDate(leave.endDate);

    this.leaveApplicationForm.patchValue({
      employeeInputType: this.employeeInputType,
      managerName: leave.managerName,
      id: leave.id,
      userId: leave.userId,
      employeeName: leave.employeeName,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      leaveType: leave.leaveType,
      reason: leave.reason,
    });

    this.leaveApplication = { ...this.leaveApplicationForm.value };
  }



  formatDate(date: string): string {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  getManagerNames() {
    this.lmsService.getManagerNames().subscribe(
      (data: string[]) => {
        this.managerNames = data;
      },
      (error: any) => {
        console.error('Error fetching manager names:', error);
      }
    );
  }


  submitUpdatedLeaveApplication() {
    debugger;
    const updatedLeaveApplication = this.leaveApplication;
    updatedLeaveApplication.status = 'Pending';

    // Call the service to update the leave application
    this.lmsService.updateLeaveApplication(updatedLeaveApplication)
      .subscribe(
        response => {
          console.log('Leave application updated successfully', response);

          // Show success message using Swal.fire
          Swal.fire({
            icon: 'success',
            title: 'Leave Updated!',
            text: 'Your leave application has been updated successfully.',
          });

          // Optionally, you can perform additional actions here
          window.location.reload();
          // Reload the page

        },
        error => {
          console.error('Error updating leave application', error);

          // Show error message using Swal.fire
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while updating your leave application. Please try again.',
          });
        }
      ); this.getLeaveStatusByuserId();
  }
 closeLeaveApplicationPopup() {
    window.location.reload();
  }

  deleteLeave(leave: any) {
    Swal.fire({
      title: 'Delete Leave',
      text: 'Are you sure you want to delete this leave entry?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const leaveId = leave.id;

        this.lmsService.deleteLeave(leaveId).subscribe(
          (response: any) => {
            console.log('Leave deleted successfully:', response);
            this.getLeaveStatusByuserId();

            Swal.fire({
              icon: 'success',
              title: 'Leave Deleted!',
              text: 'The leave entry has been deleted successfully.',
            });
          },
          (error: any) => {
            console.error('Error deleting leave:', error);

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while deleting the leave entry. Please try again.',
            });
          }
        );
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { LmsService } from '../lms service/lms.service';
import { LeaveApplication } from '../model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-leavestatus',
  templateUrl: './leavestatus.component.html',
  styleUrls: ['./leavestatus.component.css']
})
export class LeavestatusComponent implements OnInit {
  leaveStatusData: any[] | undefined;
  leaveManagementData: any[] | undefined;
  leaveApplicationForm: NgForm;
  isFormClosed: boolean = false;
  isPopupOpen = false;
  leaveApplication: LeaveApplication = {} as LeaveApplication;
  loggedInUserName: string = '';
  managerNames: { firstName: string }[] = [];

  userId: string;
  id: string;
  managerName: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  reason: string;

  constructor(
    private lmsService: LmsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.leaveApplicationForm = {} as NgForm; // Initialize NgForm
    this.userId = '';
    this.id = '';
    this.managerName = '';
    this.employeeName = '';
    this.startDate = '';
    this.endDate = '';
    this.leaveType = '';
    this.reason = '';

    


  }

  ngOnInit() {
    this.getLeaveStatusByUserId();
    this.getmanagerNames();

    // Retrieve employee name from localStorage
    const loggedInUserName = localStorage.getItem('firstName');

    if (loggedInUserName) {
      // Set the employee name in the leaveApplication object
      this.leaveApplication.employeeName = loggedInUserName;
    }

    // Fetch leave management data when the component is initialized
    this.getLeaveStatusForManaged();
  }

  getLeaveStatusByUserId() {
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

  
  

  getLeaveStatusForManaged() {
    const managerName = localStorage.getItem('firstName');

    if (managerName) {
      this.lmsService.GetLeaveStatusForManagedUsers(managerName).subscribe(
        (data: any[]) => {
          this.leaveManagementData = data;
          console.log('Leave Management Data:', this.leaveManagementData);
        }
      );
    }
  }

  editLeave(leave: any) {
   
  
    // Assuming these properties are part of your component class
    this.leaveApplication.managerName = leave.managerName;
    this.leaveApplication.id = leave.id;
    this.leaveApplication.userId = leave.userId;
    this.leaveApplication.employeeName = leave.employeeName;
    
    // Parse formatted date strings to Date objects
    this.leaveApplication.startDate = leave.startDate;
    this.leaveApplication.endDate = leave.endDate;
    
    this.leaveApplication.leaveType = leave.leaveType;
    this.leaveApplication.reason = leave.reason;
  
  }
  submitLeaveApplication() {
    const userId = localStorage.getItem('id');
 
    if (userId !== null) {
      // Initialize the error flag
      let isError = false;
 
      // Perform validation
      const currentDate = new Date();
      const startDate = this.leaveApplication.startDate ? new Date(this.leaveApplication.startDate) : null;
      const endDate = this.leaveApplication.endDate ? new Date(this.leaveApplication.endDate) : null;
 
      if (startDate && startDate < currentDate) {
        // Show error message for invalid start date
        Swal.fire({
          icon: 'error',
          title: 'Invalid Start Date',
          text: 'Start date should be equal to or greater than the current date.',
        });
 
        // Set the error flag
        isError = true;
      }
 
      if (endDate && startDate && endDate <= startDate) {
        // Show error message for invalid end date
        Swal.fire({
          icon: 'error',
          title: 'Invalid End Date',
          text: 'End date should be greater than the start date.',
        })
 
        // Set the error flag
        isError = true;
      }
 
      // Check if an error occurred
      if (isError) {
        // Stop further processing
        return;
      }
 
      // Continue with leave application submission
      this.leaveApplication.status = 'Pending';
      this.leaveApplication.userId = parseInt(userId, 10);
 
      // Set managercomment in the leaveApplication object
      this.leaveApplication.managercomment = 'Pending';
 
      this.lmsService.submitLeaveApplication(this.leaveApplication).subscribe(
        (response: any) => {
          // Check if the response indicates success
          if (response && response.success) {
            console.log(this.leaveApplication);
 
            // Show success message using Swal.fire
            Swal.fire({
              icon: 'success',
              title: 'Applied Successfully!',
              text: 'Your leave has been applied successfully.',
            });
            window.location.reload()
            // Reset the form or update the component's state to clear the form
            this.leaveApplicationForm.reset();
          } else {
            // Show an error message using a snackbar
            const errorMessage = response.message || 'An error occurred while submitting the leave application. Please try again.';
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: errorMessage,
            });
          }
        },
        (error) => {
          console.error('Error submitting leave application:', error);
 
          // Check if the error has a message
          const errorMessage = error.message || 'An error occurred while submitting the leave application. Please try again.';
 
          // Handle error and show the error message using a snackbar
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
          });
        }
      );
    }
 }
  
  
  
  

  
  
  
  submitUpdatedLeaveApplication() {
    debugger
    const updatedLeaveApplication = this.leaveApplication;
    updatedLeaveApplication.status = 'Pending';
    this.leaveApplication.managercomment = 'Pending';

    this.lmsService.updateLeaveApplication(updatedLeaveApplication)
      .subscribe(
        response => {
          console.log('Leave application updated successfully', response);

          Swal.fire({
            icon: 'success',
            title: 'Leave Updated!',
            text: 'Your leave application has been updated successfully.',
          });
          window.location.reload()
          this.isFormClosed = true;
        },
        error => {
          console.error('Error updating leave application', error);

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while updating your leave application. Please try again.',
          });
        }
      );
    this.getLeaveStatusByUserId();
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
            this.getLeaveStatusByUserId();

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


  approveLeave(leave: any) {
    debugger
    Swal.fire({
      title: 'Approve Leave',
      text: 'Are you sure you want to approve this leave entry?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!',
      input: 'text',
      inputLabel: 'Reason for approval',
      inputPlaceholder: 'Enter reason...',
      inputValidator: (value) => {
        if (!value) {
          return 'Reason is required!';
        }

        this.updateLeaveStatus(leave, 'Approved', value);
        leave.status = 'Approved';
        Swal.fire({
          icon: 'success',
          title: 'Approved Successful!',
          text: 'Leave approved successfully.',
          confirmButtonText: 'OK',
        });
        return null;
      },
    });
  }

  rejectLeave(leave: any) {
    debugger
    Swal.fire({
      title: 'Reject Leave',
      text: 'Are you sure you want to reject this leave entry?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, reject it!',
      input: 'text',
      inputLabel: 'Reason for rejection',
      inputPlaceholder: 'Enter reason...',
      inputValidator: (value) => {
        if (!value) {
          return 'Reason is required!';
        }

        this.updateLeaveStatus(leave, 'Rejected', value);
        leave.status = 'Rejected';
        Swal.fire({
          icon: 'success',
          title: 'Rejected Successful!',
          text: 'Leave rejected successfully.',
          confirmButtonText: 'OK',
        });
        return null;
      },
    });
  }

  private updateLeaveStatus(leave: any, status: string, reason?: string) {
    debugger;
    const userId = leave.userId;
    const startDate = leave.startDate;
    const endDate = leave.endDate;

    // Ensure reason is defined or set a default value
    const updatedReason = reason !== undefined ? reason : '';

    // Set managercomment in the leaveApplication object if reason is provided
    this.leaveApplication.managercomment = updatedReason;

    // Update status and managercomment in the backend
    this.lmsService.updateLeaveStatus(userId, startDate, endDate, status, this.leaveApplication.managercomment || '').subscribe(
      () => {
        leave.status = status;
        leave.managercomment = updatedReason;
        console.log(`Leave ${status}:`, leave);
        // window.location.reload();
      },
      (error: any) => {
        console.error(`Error updating leave status:`, error);
      }
    );
  }


  private formatDate(date: string): string {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private getmanagerNames() {
    const tenantName = localStorage.getItem('tenantName') || '';
    const tenantNameString = String(tenantName);
    this.lmsService.getAllManagerNames(tenantNameString)
      .subscribe(
        managerNames => {
          this.managerNames = managerNames;
          console.log('managerNames:', this.managerNames);
        },
        error => {
          console.error('Error retrieving emails:', error);
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LmsService } from '../lms service/lms.service';
import { LeaveApplication } from '../model'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-leavestatus',
  templateUrl: './leavestatus.component.html',
  styleUrls: ['./leavestatus.component.css']
})
export class LeavestatusComponent  implements OnInit{
  
  leaveStatusData: any[] | undefined; // Array to store leave status data
  leaveApplicationForm: FormGroup; // Reactive form group for leave application
  employeeInputType: string = 'dropdown'; // Default employee input type
  managerNames: string[] = []; // Array to store manager names
  isPopupOpen = false; // Flag to track if the leave application popup is open

  constructor(
    private lmsService: LmsService, // Inject LMSService for leave management operations
    private router: Router,
    private toastr: ToastrService, // Inject ToastrService for displaying toast messages
    private formBuilder: FormBuilder // Inject FormBuilder for creating reactive forms
  ) {
    // Initialize the leave application form with form controls and validators
    this.leaveApplicationForm = this.formBuilder.group({
      employeeInputType: ['dropdown'],
      managerName: [''],
      id: [null, Validators.required],  // Ensure this line is present for the Id field
      userId: [null],
      employeeName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      leaveType: ['', Validators.required],
      reason: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Fetch leave status data and manager names when the component is initialized
    this.getLeaveStatusByuserId();
    this.getManagerNames();
  }

  getLeaveStatusByuserId() {
    debugger;
    const userId = localStorage.getItem('id');

    if (userId) {
      // Call the service to get leave status data based on user id
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

  editLeave(leave: any) {
    const isoStartDate = new Date(leave.startDate).toISOString().split('T')[0];
    const isoEndDate = new Date(leave.endDate).toISOString().split('T')[0];

    // Patch form values with leave data to populate the form for editing
    this.leaveApplicationForm.patchValue({
      employeeInputType: this.employeeInputType,
      managerName: leave.managerName,
      id: leave.id,
      userId: leave.userId,
      employeeName: leave.employeeName,
      startDate: isoStartDate,
      endDate: isoEndDate,
      leaveType: leave.leaveType,
      reason: leave.reason,
    });

    // Set the popup flag to true to open the leave application popup
    this.isPopupOpen = true;
  }

  getManagerNames() {
    // Call the service to get manager names
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
    const updatedLeaveApplication = this.leaveApplicationForm.value;
  
    if (updatedLeaveApplication.id != null) {
      // Call the service to update the leave application
      this.lmsService.updateLeaveApplication(updatedLeaveApplication).subscribe(
        (response: any) => {
          console.log('Leave updated successfully:', response);
          this.isPopupOpen = false; // Close the leave application popup
          this.getLeaveStatusByuserId(); // Refresh the leave status data
        },
        (error: any) => {
          console.error('Error updating leave:', error);
        }
      );
    } else {
      console.error('Invalid Id for leave application.');
    }
  }
  

  resetLeaveApplication() {
    // Reset the leave application form
    this.leaveApplicationForm.reset();
  }

  closeLeaveApplicationPopup() {
    // Set the popup flag to false to close the leave application popup
    this.isPopupOpen = false;
  }

  deleteLeave(leave: any) {
    // Confirm the deletion with the user
    const confirmDelete = confirm('Are you sure you want to delete this leave entry?');

    if (confirmDelete) {
      const leaveId = leave.id;

      // Call the service to delete the leave entry
      this.lmsService.deleteLeave(leaveId).subscribe(
        (response: any) => {
          console.log('Leave deleted successfully:', response);
          this.getLeaveStatusByuserId(); // Refresh the leave status data
        },
        (error: any) => {
          console.error('Error deleting leave:', error);
        }
      );
    }
  }


}

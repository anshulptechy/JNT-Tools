import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LmsService } from '../lms service/lms.service';
import { LeaveApplication } from '../model'; // Import the LeaveApplication model
import { HttpClient } from '@angular/common/http';

import { createClient } from '@supabase/supabase-js'; // Import Supabase client for authentication
import Swal from 'sweetalert2';



@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent {

  isPopupOpen = true; // Flag to track if the leave application popup is open
  managerNames: string[] = []; // Array to store manager names
  employeeInputType: string = 'dropdown'; // Default employee input type
  leaveApplication: LeaveApplication = {} as LeaveApplication; // Object to store leave application details
  // username: string | undefined; // Variable to store the username

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private lmsService: LmsService,


  ) { }

  ngOnInit() {
    
    // Fetch manager names when the component is initialized
    this.getManagerNames();
  }

  getManagerNames() {
    debugger;
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

  openLeaveApplicationPopup() {
    // Close the sidenav and set the popup flag to true
     this.isPopupOpen = true;
  }

  closeLeaveApplicationPopup() {
    // Set the popup flag to false
    this.isPopupOpen = false;
  }

  submitLeaveApplication() {
    const userId = localStorage.getItem('id');

    if (userId !== null) {
      // Set the userId from localStorage to the leave application
      this.leaveApplication.userId = parseInt(userId, 10);

      // Call the service to submit the leave application
      this.lmsService.submitLeaveApplication(this.leaveApplication).subscribe(
        (response) => {
          console.log(this.leaveApplication);
        });

      Swal.fire({
        icon: 'success',
        title: 'Applied Successful!',
        text: 'Your leave has been applied successfully.',
      });// Display success toast message and close the popup

      this.closeLeaveApplicationPopup();
    }
  }

  resetLeaveApplication() {
    // Reset the leave application object
    this.leaveApplication = {} as LeaveApplication;
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LmsService } from '../lms service/lms.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent  implements OnInit {
  leaveManagementData: any[] | undefined; // Array to store leave management data

  constructor(private router: Router, private lmsService: LmsService) { }

  ngOnInit() {
    // Fetch leave management data when the component is initialized
    this.getLeaveStatusForManaged();
  }

  getLeaveStatusForManaged() {
    debugger;
    // Retrieve the manager's name from localStorage
    const managerName = localStorage.getItem('firstName'); // Assuming the manager's name is the username

    if (managerName) {
      // Call the service to get leave status data for managed users
      this.lmsService.GetLeaveStatusForManagedUsers(managerName).subscribe(
        (data: any[]) => {
          this.leaveManagementData = data; // Assign the fetched data to leaveManagementData
          console.log('Leave Status Data:', this.leaveManagementData);
        }
      );
    }
  }

  goToLeaveManagement() {
    // Navigate to the leave management page
    this.router.navigate(['/leave-management']);
  }

  approveLeave(leave: any) {
    // Update leave status to 'Approved' and display success toast message
    this.updateLeaveStatus(leave, 'Approved');
    Swal.fire({
      icon: 'success',
      title: 'Approved Successful!',
      text: ' leave approved successfully.',
    });
  }

  rejectLeave(leave: any) {
    // Update leave status to 'Rejected' and display error toast message
    this.updateLeaveStatus(leave, 'Rejected');
    Swal.fire({
      icon: 'success',
      title: 'Rejected Successful!',
      text: ' leave Rejected successfully.',
    });
  }

  private updateLeaveStatus(leave: any, status: string) {
    // Extract relevant information from the leave object
    const userId = leave.userId;
    const startDate = leave.startDate;
    const endDate = leave.endDate;

    // Call the service to update the leave status
    this.lmsService.updateLeaveStatus(userId, startDate, endDate, status).subscribe(
      () => {
        leave.status = status; // Update the status property of the leave object
        console.log(`Leave ${status}:`, leave);
      },
      (error: any) => {
        console.error(`Error updating leave status:`, error);
      }
    );
  }
}

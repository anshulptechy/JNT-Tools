import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {
  taskDetails: FormGroup | any;
  users: any[] = []
  isAdminLoggedIn = false;
  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private fb: FormBuilder,
    private serve: TaskService, private baseServe:TenantService
  ) {
    // Initialize form controls
    this.taskDetails = this.fb.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskStartTime: ['', Validators.required],
      taskEndTime: ['', Validators.required],
      userName: ['', Validators.required],
    });
    // Load usernames based on user role
    this.loadUsernames();

  }

  async loadUsernames() {
    const tenantName= localStorage.getItem('tenantName')||''
    this.baseServe.getUserByTenant(tenantName).subscribe((result) => {
      if (typeof result === 'object' && result !== null) {
        this.users = Object.values(result).map((value: string) => ({ value, viewValue: value }));
      } else {
        console.error('Unexpected data format. Expected an object.');
      }
    });
  }


  onSaveClick(data: any) {
    
    // Save data and close the dialog
    data.tenantName=localStorage.getItem('tenantName')
    this.serve.addData(data).subscribe((result) => {
      this.dialogRef.close(result);
    });

  }


  onCancelClick() {
    // Close the dialog without saving
    this.dialogRef.close();
  }


  
}

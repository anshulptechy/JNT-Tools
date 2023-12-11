import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createClient } from '@supabase/supabase-js';
import { TaskService } from '../services/task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent {
// Properties for form control, Supabase configuration, and user login status
isAdminLoggedIn = false;
updateDetails: FormGroup | any;
users: any[] = []

// Constructor to inject dependencies
constructor(public dialogRef: MatDialogRef<TaskUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder, private serve: TaskService, private baseServe: TenantService) { }

// Lifecycle hook called after the component is initialized
ngOnInit() {
  this.loadUsernames(); // Wait for usernames to be loaded
  this.initializeForm();
  this.populateForm();
}

// Method to load usernames from Supabase
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

// Method to initialize the form
initializeForm() {
  this.updateDetails = this.fb.group({
    taskName: ['', Validators.required],
    taskDescription: ['', Validators.required],
    taskStartTime: ['', Validators.required],
    taskEndTime: ['', Validators.required],
    userName: ['', Validators.required],
  });
}

// Method to populate the form with task data
populateForm() {
  this.serve.getTaskById(this.data.data.id).subscribe((result) => {
    // Assuming result.userName is the default value you want for userName
    const defaultUserName = (result as any).userName;


    // Patch the form with the retrieved data and set the default value for userName
    this.updateDetails.patchValue({
      taskName: (result as any).taskName,
      taskDescription: (result as any).taskDescription,
      taskStartTime: (result as any).taskStartTime,
      taskEndTime: (result as any).taskEndTime,
      userName: defaultUserName
    });
  });
}

// Method to handle save button click
onSaveClick(data1: any) {
  data1.id = this.data.data.id;
  data1.tenantName=localStorage.getItem('tenantName')
  this.serve.putData(data1).subscribe((result) => {
    this.dialogRef.close(result);
  });
}

// Method to handle cancel button click
onCancelClick() {
  this.dialogRef.close();
}
}

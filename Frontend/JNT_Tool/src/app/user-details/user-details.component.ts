import { Component } from '@angular/core';
import { TaskUpdateComponent } from '../task-update/task-update.component';
import { TaskService } from '../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
// Form group for user tasks and flag to track data availability
userTasks: FormGroup | any;
dataCame: boolean = false;
isAdminLoggedIn:boolean=false;

// Constructor to inject services and initialize the form
constructor(private serve: TaskService, private fb: FormBuilder, private dialog: MatDialog) {
  this.userTasks = this.fb.group({
    userName: ['', Validators.required],
  });
}

// Array to store user task details
userTasksDetails: any[] = []
tenant:string=localStorage.getItem('tenantName')||''
// Method to get user tasks based on the provided username
getUserTasks(user: string) {
  const userName = encodeURIComponent(user);
  this.serve.getUserTasksDetails(userName,this.tenant).subscribe((result) => {
    this.dataCame = true;
    this.userTasksDetails = result as any;

  })
}

// Method to open the edit task dialog
editTask(task: any) {
  const dialogRef = this.dialog.open(TaskUpdateComponent, {

    width: '400px',
    data: {
      data: task,
    },
  });
  dialogRef.afterClosed().subscribe(() => {
  });
}

deleteTask(data:any){
  this.serve.delete(data).subscribe(() => {
    this.reloadSite();
  });
}

reloadSite(){
    this.serve.getUserTasksDetails(this.userTasks.value.userName,this.tenant).subscribe((result) => {
      this.userTasksDetails = result as any;
    });
}
}

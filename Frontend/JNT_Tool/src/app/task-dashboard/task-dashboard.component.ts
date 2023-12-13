import { Component } from '@angular/core';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskService } from '../services/task.service';
import { TaskUpdateComponent } from '../task-update/task-update.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent {
  taskId: number = 0;
  tasks: any[] = [];
  store3: Date = new Date();
  myuserName: string = '';
  userTaskBoolean = false;

  materialDialog = false;

  // Constructor
  constructor(private serve: TaskService, private dialog: MatDialog) {
    this.reloadSite();
  }

  // Toggle to show user-specific tasks
  userTaskTab() {
    this.userTaskBoolean = true;
  }

  // Function to delete a task
  deleteTask(data: number) {
    this.serve.delete(data).subscribe((result) => {
      this.reloadSite();
    });
  }

  // Function to edit a task
  editTask(task: any) {
    const dialogRef = this.dialog.open(TaskUpdateComponent, {
      width: '600px',
      data: {
        data: task,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the result data (new project details)
        const index = this.tasks.findIndex(p => p.id === result.id);
        if (index !== -1) {
          this.tasks[index] = result;
        }
      }
    });
  }

  // Function to open a dialog for adding a new task
  openDialog() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '600px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the result data (new project details)
        this.tasks.push(result);
      }
    });

    this.reloadSite();
  }

  user: string = '';
  tenantName:string=''
  // Reload site data after every functionality
  reloadSite() {
    if(this.tasks.length==1){
      this.tasks=[]
    }
     this.tenantName= localStorage.getItem('tenantName')||''
      this.serve.getTenantTask(this.tenantName).subscribe((result) => {
        this.tasks = result as any;
      });
      
  }   
}

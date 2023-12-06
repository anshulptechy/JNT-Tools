// dashboard.component.ts

import { Component } from '@angular/core';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateButtonComponent } from '../update-button/update-button.component';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { ProjectService } from '../../crudProjectService/services/project.service';
import { projects } from '../../crud{ProjectModel/model/dataType';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showContent: boolean = true;
  showProjectsTable: boolean = true;
  buttonClicked: boolean = true;

  editedForm: FormGroup | any


  constructor(private dialog: MatDialog, private serve: ProjectService, private fb: FormBuilder, private router: Router,
   ) {
   
    serve.getData().subscribe((result) => {
      this.projects = (result as any[]).filter(project => project.status == 'Active');
    })

  }
 
  // Example data, replace with your actual data
  projects: projects[] = [];

  showProjects() {
    
    this.showContent = true;
    this.showProjectsTable = true;
  }

  //confirmation dialog component start
  openConfirmationDialog(project: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '600px',
      data: {
        message: 'Are you sure you want to delete this project Details?',
      }
    });
    dialogRef.afterClosed().subscribe((confirmationResult: boolean) => {
      if (confirmationResult) {
        project.Status = 'Not Active'
        this.serve.updateProjectDetail(project).subscribe((result) => {
          this.projects = this.projects.filter(p => p !== project);
        });
      }
    });
  }

  //confirmation dialog end.



  //create project dialog start
  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent, {
      width: '600px',
      data: {
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the result data (new project details)
        this.projects.push(result);
      }
    });
  }
  //end of create project dialog



  //dialog box for update
  openUpdateProjectDialog(project: any): void {
    const dialogRef = this.dialog.open(UpdateButtonComponent, {

      width: '600px',
      data: {
        data: project,

      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {

        // Find the index of the updated project in the projects array
        const index = this.projects.findIndex(p => p.projectId === result.projectId);

        if (index !== -1) {
          // Update the projects array with the updated project data
          this.projects[index] = result;
        }
      }
    });

  }

  //end update dialog region  

  onLogoutClick() {
    localStorage.removeItem('isUserLoggeedIn')
    this.router.navigate(['/log-in'])
  }

}


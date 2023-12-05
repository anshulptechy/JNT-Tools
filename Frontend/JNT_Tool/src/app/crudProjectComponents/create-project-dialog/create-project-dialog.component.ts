// create-project-dialog.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../crudProjectService/services/project.service';


@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css'],
})
export class CreateProjectDialogComponent implements OnInit {
  projectForm: FormGroup | any;


  countries: string[] = ['India', 'Australia', 'United States', 'England', 'Russia', 'China','Canada','Dubai','Quator','Japan','Italy','Israel'];
  
  
  constructor(
    public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private fb: FormBuilder, private serve: ProjectService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {

    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      client: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      country: ['', Validators.required],
      budget: ['', Validators.required],
      status: [true],
    });
  }

  Id: number = 0;
  onSaveClick(data: any) {
    data.status = 'Active';
    data.projectId = this.Id;
    this.serve.addProject(data).subscribe((result) => {
      this.dialogRef.close(result);

    });
  }
  onCancelClick() {
    // Close the dialog without saving
    this.dialogRef.close();
  }

}

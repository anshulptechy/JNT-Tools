// create-project-dialog.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../crudProjectService/services/project.service';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css'],
})
export class CreateProjectDialogComponent implements OnInit {
  projectForm: FormGroup | any;

  matcher = new MyErrorStateMatcher();
  countries: string[] = ['USA', 'Canada', 'UK', 'Germany', 'France', 'Australia', 'Japan', 'South Korea', 'Singapore', 'India', 'Brazil', 'Mexico', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Iceland'];
  
  
  constructor(
    public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private fb: FormBuilder, private serve: ProjectService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {

    this.projectForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.maxLength(100)]],
      client: ['', [Validators.required, Validators.maxLength(100)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      country: ['', Validators.required],
      budget: ['', [Validators.max(999999999)]],
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
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

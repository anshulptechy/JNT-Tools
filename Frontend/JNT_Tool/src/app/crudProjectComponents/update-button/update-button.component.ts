// update-button.component.ts

import { Component, OnInit,Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../crudProjectService/services/project.service';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-update-button',
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.css']
})
export class UpdateButtonComponent implements OnInit {
  
  updateForm: FormGroup | any;
  matcher = new MyErrorStateMatcher();
  countries: string[] = ['USA', 'Canada', 'UK', 'Germany', 'France', 'Australia', 'Japan', 'South Korea', 'Singapore', 'India', 'Brazil', 'Mexico', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Iceland'];

  constructor(public dialogRef: MatDialogRef<UpdateButtonComponent>,  @Inject(MAT_DIALOG_DATA) public data: any, 
  private fb: FormBuilder, private serve:ProjectService) {
    
  }
    ngOnInit() {
      this.initializeForm();
      this.populateForm();
    }

  initializeForm() {
    this.updateForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.maxLength(100)]],
      client: ['', [Validators.required, Validators.maxLength(100)]],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      country: ['',Validators.required],
      budget: ['', [Validators.max(999999999)]],
      status: [false],
    });
  }
  populateForm() {

    this.serve.getbyid(this.data.data.projectId).subscribe((result) => {
      
     
       
      this.updateForm.patchValue({
        projectName:(result as any).projectName,
        client: (result as any).client,
        startDate: (result as any).startDate,
        endDate: (result as any).endDate,
        country:(result as any).country,
        budget:(result as any).budget,
        status: (result as any).status,
      });
      })
  
  }

  onSaveClick(data1:any) {
   
    data1.status = this.updateForm.get('status').value ? 'Active' : 'Not Active';

    data1.projectId=this.data.data.projectId;
    
    this.serve.updateProjectDetail(data1).subscribe((result)=>{
      this.dialogRef.close(result);
    });

    }

  onCancelClick() {
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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
  baseServerUrl=" https://localhost:44318/api/"

  registerUser(){
    // this.http.post
  }
  getData(){
    return this.http.get("https://localhost:44318/api/CrudProject/GetAllProjectDetails")
  }
 
  addProject(data:any){
    return this.http.post('https://localhost:44318/api/CrudProject/createProject',data);
  }

  updateProjectDetail(data: any){
    console.log(data);
    return this.http.put('https://localhost:44318/api/CrudProject/updateProject',data);
  }
  
  getbyid(projectId: number){
     return this.http.get(`https://localhost:44318/api/CrudProject/GetProjectById?Id=${projectId}`);
  }
}
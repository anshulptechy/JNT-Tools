import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
  baseServerUrl=" http://165.22.223.179:8080/api/"

  registerUser(){
    // this.http.post
  }
  getData(){
    return this.http.get("http://165.22.223.179:8080/GetAllProjectDetails")
  }
 
  addProject(data:any){
    return this.http.post('http://165.22.223.179:8080/createProject',data);
  }

  updateProjectDetail(data: any){
    console.log(data);
    return this.http.put('http://165.22.223.179:8080/updateProject',data);
  }
  
  getbyid(projectId: number){
     return this.http.get(`http://165.22.223.179:8080/GetProjectById?Id=${projectId}`);
  }
}
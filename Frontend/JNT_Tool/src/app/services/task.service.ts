import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  
  getTaskData() {
    return this.http.get("https://localhost:7126/api/TaskManagement/GetAll");
  }

  getTenantTask(tenantName:any){
    return this.http.get(`https://localhost:7126/api/TaskManagement/GetTasksByTenantName?tenantName=${tenantName}`)
  }
  delete(id: number) {
    return this.http.delete(`https://localhost:7126/api/TaskManagement/Delete/${id}`)
  }


  addData(data: any) {
    return this.http.post(`https://localhost:7126/api/TaskManagement/Create`, data)
  }


  putData(data: any) {
    return this.http.put(`https://localhost:7126/api/TaskManagement/Update`, data)
  }
  
  getUserNames(tenantName:any){
    return this.http.get(`https://localhost:7126/api/TaskManagement/GetUsersByTenantName?tenantName=${tenantName}`)
  }

  getTaskById(use: number) {
    return this.http.get(`https://localhost:7126/api/TaskManagement/GetById?Id=${use}`)
  }
}

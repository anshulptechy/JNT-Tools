import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class TenantService {
baseUrl='https://localhost:7126/api/Tenant/'
  constructor(private userHttp:HttpClient) { }
  
  getAllTenants()
  {
    return this.userHttp.get(this.baseUrl+'GetAllTenant');
  }
  getUserByTenant(tenantName: string){
    return this.userHttp.get(`https://localhost:7126/api/Tenant/GetUsersByTenantName?tenantName=${tenantName}`)
  }
  createTenants(newTenantData:any){
    return this.userHttp.post(this.baseUrl+'CreateTenant',newTenantData)
    
  }
  updateTenant(updatedData:any)
  {
    return this.userHttp.post(this.baseUrl+'UpdateTenant',updatedData);
   
  }
  deleteTenant(id: number) {
    return this.userHttp.delete(this.baseUrl+`Delete/${id}`);
  }
  
}

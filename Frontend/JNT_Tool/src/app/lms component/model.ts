export interface LeaveApplication {
    employeeInputType: any;
    status: string;
    id?:number;
    employeeName?:string;
    managerName?: string;
    startDate?: Date ;
    endDate?: Date ;
    leaveType?: string;
    reason?: string;
    userId: number; 
  }
  
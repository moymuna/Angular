export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  designation: string; 
  joiningDate: string;
  status: 'Active' | 'Inactive';
}



export interface Attendance {
  id?:string;
  employeeId: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string; 
  status: 'Present' | 'Absent' | 'Late';
}


export interface LeaveRequest {
  id?: string;
  employeeId: string;
  leaveType: 'Sick' | 'Annual' | 'Casual';
  startDate: Date;
  endDate: Date;
  reason: string;
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
}


export interface User {
  id?: string;
  username: string;
  role: 'Admin' | 'HR' | 'Employee';
  token?: string; 
}


export interface ApiResponse<T> {
  data: T;          
  success: boolean;
  message: string;
}
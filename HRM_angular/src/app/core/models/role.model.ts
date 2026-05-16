export enum Role {
  SuperAdmin = 'Super admin',
  HrManager = 'HR manager',
  DepartmentManager = 'department manager',
  Employee = 'employee',
  Recruiter = 'recruter',
  Accountant = 'acountant'
}

export enum Feature {
  EmployeeManagement = 'employee management',
  AttendanceManagement = 'attendance managment',
  LeaveManagement = 'leave managment',
  PayrollManagement = 'payroll managment',
  RecruitmentManagement = 'recruitment managment',
  TrainingDevelopment = 'training and devlopment',
  DocumentManagement = 'document managment'
}

export const RolePermissions: Record<Role, Feature[]> = {
  [Role.SuperAdmin]: [
    Feature.EmployeeManagement, Feature.AttendanceManagement, Feature.LeaveManagement, 
    Feature.PayrollManagement, Feature.RecruitmentManagement, Feature.TrainingDevelopment, 
    Feature.DocumentManagement
  ],
  [Role.HrManager]: [
    Feature.EmployeeManagement, Feature.AttendanceManagement, Feature.LeaveManagement,
    Feature.RecruitmentManagement, Feature.TrainingDevelopment, Feature.DocumentManagement
  ],
  [Role.DepartmentManager]: [
    Feature.EmployeeManagement, Feature.AttendanceManagement, Feature.LeaveManagement,
    Feature.TrainingDevelopment
  ],
  [Role.Employee]: [
    Feature.AttendanceManagement, Feature.LeaveManagement, Feature.TrainingDevelopment
  ],
  [Role.Recruiter]: [
    Feature.RecruitmentManagement
  ],
  [Role.Accountant]: [
    Feature.PayrollManagement
  ]
};

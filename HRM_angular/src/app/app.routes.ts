import { Routes } from '@angular/router';
import { EmployeeComponent } from './feature/employee/employee';
import { AttendanceComponent } from './feature/attendance/attendance';
import { LeaveComponent } from './feature/leave/leave';
import { ApiComponent } from './feature/api/api';
import { UserComponent } from './feature/user/user';
import { PayrollComponent } from './feature/payroll/payroll';
import { RecruitmentComponent } from './feature/recruitment/recruitment';
import { TrainingDevelopmentComponent } from './feature/training-development/training-development';
import { DocumentManagementComponent } from './feature/document-management/document-management';
import { roleGuard } from './core/guards/role.guard';
import { Feature } from './core/models/role.model';

export const routes: Routes = [
    { path: '', redirectTo: 'employee', pathMatch: 'full' },
    { 
      path: 'employee', 
      component: EmployeeComponent,
      canActivate: [roleGuard],
      data: { feature: Feature.EmployeeManagement }
    },
    { 
      path: 'attendance', 
      component: AttendanceComponent,
      canActivate: [roleGuard],
      data: { feature: Feature.AttendanceManagement }
    },
    { 
      path: 'leave', 
      component: LeaveComponent,
      canActivate: [roleGuard],
      data: { feature: Feature.LeaveManagement }
    },
    { 
      path: 'payroll', 
      component: PayrollComponent,
      canActivate: [roleGuard],
      data: { feature: Feature.PayrollManagement }
    },
    { 
      path: 'recruitment', 
      component: RecruitmentComponent,
      canActivate: [roleGuard],
      data: { feature: Feature.RecruitmentManagement }
    },
    { 
      path: 'training', 
      component: TrainingDevelopmentComponent,
      canActivate: [roleGuard],
      data: { feature: Feature.TrainingDevelopment }
    },
    { 
      path: 'documents', 
      component: DocumentManagementComponent,
      canActivate: [roleGuard],
      data: { feature: Feature.DocumentManagement }
    },
    { path: 'api', component: ApiComponent },
    { path: 'user', component: UserComponent }
];

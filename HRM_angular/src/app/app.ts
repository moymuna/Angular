import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth-service';
import { Feature, Role } from './core/models/role.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  authService = inject(AuthService);
  
  roles = Object.values(Role);
  
  menuItems = [
    { path: '/employee', label: 'Employees', feature: Feature.EmployeeManagement },
    { path: '/attendance', label: 'Attendance', feature: Feature.AttendanceManagement },
    { path: '/leave', label: 'Leave', feature: Feature.LeaveManagement },
    { path: '/payroll', label: 'Payroll', feature: Feature.PayrollManagement },
    { path: '/recruitment', label: 'Recruitment', feature: Feature.RecruitmentManagement },
    { path: '/training', label: 'Training', feature: Feature.TrainingDevelopment },
    { path: '/documents', label: 'Documents', feature: Feature.DocumentManagement }
  ];

  changeRole(event: Event) {
    const role = (event.target as HTMLSelectElement).value as Role;
    this.authService.setRole(role);
  }
}

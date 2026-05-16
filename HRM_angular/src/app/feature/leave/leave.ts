import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeaveRequest, Employee } from '../../shared/models';
import { LeaveService } from '../../core/services/leave-service';
import { EmployeeService } from '../../core/services/employee-service';

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave.html',
  styleUrl: './leave.css',
})
export class LeaveComponent implements OnInit {
  leaves: LeaveRequest[] = [];
  employees: Employee[] = [];

  leave: LeaveRequest = this.getEmptyLeave();

  isEdit = false;
  message = '';
  isError = false;

  constructor(
    private leaveService: LeaveService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getLeaves();
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (res) => (this.employees = res),
      error: (err) => console.error('Error fetching employees', err),
    });
  }

  getLeaves(): void {
    this.leaveService.getLeaves().subscribe({
      next: (res) => {
        this.leaves = res;
      },
      error: (err) => {
        console.error('Error loading leaves:', err);
        this.showMessage('Failed to load leave requests', true);
      },
    });
  }

  addLeave(): void {
    if (!this.validateForm()) return;

    console.log('Submitting leave request:', this.leave);
    this.leaveService.addLeave(this.leave).subscribe({
      next: (res) => {
        console.log('Leave added:', res);
        this.getLeaves();
        this.resetForm();
        this.showMessage('Leave request submitted successfully');
      },
      error: (err) => {
        console.error('Error adding leave:', err);
        this.showMessage('Failed to submit leave request', true);
      },
    });
  }

  editLeave(leave: LeaveRequest): void {
    this.leave = JSON.parse(JSON.stringify(leave)); // Deep copy
    this.isEdit = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateLeave(): void {
    if (!this.leave.id || !this.validateForm()) return;

    console.log('Updating leave request:', this.leave);
    this.leaveService.updateLeave(this.leave.id, this.leave).subscribe({
      next: (res) => {
        console.log('Leave updated:', res);
        this.getLeaves();
        this.resetForm();
        this.isEdit = false;
        this.showMessage('Leave request updated successfully');
      },
      error: (err) => {
        console.error('Error updating leave:', err);
        this.showMessage('Failed to update leave request', true);
      },
    });
  }

  deleteLeave(id?: string): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this leave request?')) {
      this.leaveService.deleteLeave(id).subscribe({
        next: () => {
          this.getLeaves();
          this.showMessage('Leave request deleted');
        },
        error: (err) => {
          console.error(err);
          this.showMessage('Failed to delete leave request', true);
        },
      });
    }
  }

  validateForm(): boolean {
    if (!this.leave.employeeId || !this.leave.leaveType || !this.leave.startDate || !this.leave.endDate) {
      this.showMessage('Please fill in all required fields', true);
      return false;
    }
    return true;
  }

  showMessage(msg: string, isError = false): void {
    this.message = msg;
    this.isError = isError;
    setTimeout(() => (this.message = ''), 3000);
  }

  resetForm(): void {
    this.leave = this.getEmptyLeave();
    this.isEdit = false;
  }

  getEmptyLeave(): LeaveRequest {
    return {
      employeeId: '',
      leaveType: 'Sick',
      startDate: new Date(),
      endDate: new Date(),
      reason: '',
      approvalStatus: 'Pending',
    };
  }

  getEmployeeName(id: string): string {
    const emp = this.employees.find((e) => e.id === id);
    return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown';
  }
}

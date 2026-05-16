import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Attendance, Employee } from '../../shared/models';
import { AttendanceService } from '../../core/services/attendance-service';
import { EmployeeService } from '../../core/services/employee-service';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class AttendanceComponent implements OnInit {
  attendances: Attendance[] = [];
  employees: Employee[] = [];

  attendance: Attendance = this.getEmptyAttendance();

  isEdit = false;
  message = '';
  isError = false;

  constructor(
    private attendanceService: AttendanceService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getAttendance();
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (res) => (this.employees = res),
      error: (err) => console.error('Error fetching employees', err),
    });
  }

  getAttendance(): void {
    this.attendanceService.getAttendance().subscribe({
      next: (res) => {
        this.attendances = res;
      },
      error: (err) => {
        console.error(err);
        this.showMessage('Failed to load attendance records', true);
      },
    });
  }

  addAttendance(): void {
    if (!this.validateForm()) return;

    console.log('Adding attendance:', this.attendance);
    this.attendanceService.addAttendance(this.attendance).subscribe({
      next: (res) => {
        console.log('Response from server:', res);
        this.getAttendance();
        this.resetForm();
        this.showMessage('Attendance added successfully');
      },
      error: (err) => {
        console.error('Error adding attendance:', err);
        this.showMessage('Failed to add attendance', true);
      },
    });
  }

  editAttendance(att: Attendance): void {
    this.attendance = JSON.parse(JSON.stringify(att)); // Deep copy
    this.isEdit = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateAttendance(): void {
    if (!this.attendance.id || !this.validateForm()) return;

    console.log('Updating attendance:', this.attendance);
    this.attendanceService
      .updateAttendance(this.attendance.id, this.attendance)
      .subscribe({
        next: (res) => {
          console.log('Update response:', res);
          this.getAttendance();
          this.resetForm();
          this.isEdit = false;
          this.showMessage('Attendance updated successfully');
        },
        error: (err) => {
          console.error('Update error:', err);
          this.showMessage('Failed to update attendance', true);
        },
      });
  }

  deleteAttendance(id?: string): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this record?')) {
      this.attendanceService.deleteAttendance(id).subscribe({
        next: () => {
          this.getAttendance();
          this.showMessage('Attendance record deleted');
        },
        error: (err) => {
          console.error(err);
          this.showMessage('Failed to delete attendance', true);
        },
      });
    }
  }

  validateForm(): boolean {
    if (!this.attendance.employeeId || !this.attendance.date || !this.attendance.status) {
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
    this.attendance = this.getEmptyAttendance();
    this.isEdit = false;
  }

  getEmptyAttendance(): Attendance {
    return {
      employeeId: '',
      date: new Date().toISOString().split('T')[0],
      checkInTime: '',
      checkOutTime: '',
      status: 'Present'
    };
  }

  getEmployeeName(id: string): string {
    const emp = this.employees.find((e) => e.id === id);
    return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown';
  }
}
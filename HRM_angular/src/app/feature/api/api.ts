import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../core/services/api-service';

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './api.html',
  styleUrl: './api.css',
})
export class ApiComponent implements OnInit {

  employees: any[] = [];

  employee: any = {
    firstName: '',
    lastName: '',
    email: '',
  };

  isEdit = false;

  currentId = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  // GET
  getEmployees(): void {

    this.apiService
      .getAll<any>('employees')
      .subscribe({
        next: (res) => {
          this.employees = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // ADD
  addEmployee(): void {

    this.apiService
      .create<any>('employees', this.employee)
      .subscribe({
        next: () => {
          this.getEmployees();
          this.resetForm();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // EDIT
  editEmployee(emp: any): void {

    this.employee = { ...emp };

    this.currentId = emp.id;

    this.isEdit = true;
  }

  // UPDATE
  updateEmployee(): void {

    this.apiService
      .update<any>(
        'employees',
        this.currentId,
        this.employee
      )
      .subscribe({
        next: () => {
          this.getEmployees();
          this.resetForm();
          this.isEdit = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // DELETE
  deleteEmployee(id: string): void {

    this.apiService
      .delete('employees', id)
      .subscribe({
        next: () => {
          this.getEmployees();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // RESET
  resetForm(): void {

    this.employee = {
      firstName: '',
      lastName: '',
      email: '',
    };

    this.currentId = '';
  }
}

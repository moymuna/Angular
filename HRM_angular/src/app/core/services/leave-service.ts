import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LeaveRequest } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {

  private apiUrl = `${environment.apiUrl}/leaveRequests`;

  constructor(private http: HttpClient) {}

  // GET ALL LEAVES
  getLeaves(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.apiUrl);
  }

  // GET LEAVE BY ID
  getLeaveById(id: string): Observable<LeaveRequest> {
    return this.http.get<LeaveRequest>(`${this.apiUrl}/${id}`);
  }

  // GET LEAVES BY EMPLOYEE
  getLeavesByEmployee(employeeId: string): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(
      `${this.apiUrl}?employeeId=${employeeId}`
    );
  }

  // ADD LEAVE
  addLeave(leave: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(this.apiUrl, leave);
  }

  // UPDATE LEAVE
  updateLeave(
    id: string,
    leave: LeaveRequest
  ): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(
      `${this.apiUrl}/${id}`,
      leave
    );
  }

  // DELETE LEAVE
  deleteLeave(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
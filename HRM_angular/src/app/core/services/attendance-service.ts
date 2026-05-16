import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Attendance } from '../../shared/models';



@Injectable({
  providedIn: 'root',
})
export class AttendanceService {

  private apiUrl = `${environment.apiUrl}/attendance`;

  constructor(private http: HttpClient) {}

  // GET ALL ATTENDANCE
  getAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.apiUrl);
  }

  // GET ATTENDANCE BY ID
  getAttendanceById(id: string): Observable<Attendance> {
    return this.http.get<Attendance>(`${this.apiUrl}/${id}`);
  }

  // GET ATTENDANCE BY EMPLOYEE ID
  getAttendanceByEmployee(employeeId: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(
      `${this.apiUrl}?employeeId=${employeeId}`
    );
  }

  // ADD ATTENDANCE
  addAttendance(attendance: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(this.apiUrl, attendance);
  }

  // UPDATE ATTENDANCE
  updateAttendance(
    id: string,
    attendance: Attendance
  ): Observable<Attendance> {
    return this.http.put<Attendance>(
      `${this.apiUrl}/${id}`,
      attendance
    );
  }

  // DELETE ATTENDANCE
  deleteAttendance(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
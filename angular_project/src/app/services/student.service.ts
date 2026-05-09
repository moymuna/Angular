import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentMOdel } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
private baseApi: string="http://localhost:3000/student";
constructor(private http:HttpClient){}


// get request
getAllStudents():Observable<StudentMOdel[]>{
  return this.http.get<StudentMOdel[]>(this.baseApi)
}


// post request
saveStudent(student:StudentMOdel){
  return this.http.post<StudentMOdel>(this.baseApi,student)
}


// put request
uodateStudent(student:StudentMOdel):Observable<StudentMOdel>{
return this.http.put<StudentMOdel>(this.baseApi+'/'+student.id,student)

}

// delete request
deleteStudent(id:string):Observable<void>{
  return this.http.delete<void>(this.baseApi+'/'+id)
}


}



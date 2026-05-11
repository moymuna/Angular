import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeacherModel } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
   private teacherAPI=environment.apiUrl+"teacher";

  constructor(private http:HttpClient){}

  // get request
  getAllTeacher():Observable<TeacherModel[]>{
    return this.http.get<TeacherModel[]>(this.teacherAPI);
  }

  // post request
  save(teacher:TeacherModel){
    return this.http.post<TeacherModel>(this.teacherAPI,teacher)
  }
  
  
  // put request
  update(teacher:TeacherModel):Observable<TeacherModel>{
  return this.http.put<TeacherModel>(this.teacherAPI+'/'+teacher.id,teacher)
  
  }
  
  // delete request
  delete(id:string):Observable<void>{
    return this.http.delete<void>(this.teacherAPI+'/'+id)
  }
  
  getById(id:string):Observable<TeacherModel>{
    return this.http.get<TeacherModel>(this.teacherAPI+'/'+id);
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../model/department.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private deptAPI=environment.apiUrl+"department";

  constructor(private http:HttpClient){}

  // get request
  getAllDept():Observable<DepartmentModel[]>{
    return this.http.get<DepartmentModel[]>(this.deptAPI);
  }

  // post request
  save(department:DepartmentModel){
    return this.http.post<DepartmentModel>(this.deptAPI,department)
  }
  
  
  // put request
  update(department:DepartmentModel):Observable<DepartmentModel>{
  return this.http.put<DepartmentModel>(this.deptAPI+'/'+department.id,department)
  
  }
  
  // delete request
  delete(id:string):Observable<void>{
    return this.http.delete<void>(this.deptAPI+'/'+id)
  }
  
  getById(id:string):Observable<DepartmentModel>{
    return this.http.get<DepartmentModel>(this.deptAPI+'/'+id);
  }
}

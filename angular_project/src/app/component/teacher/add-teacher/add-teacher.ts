import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../services/teacher.service';
import { DepartmentService } from '../../../services/department.service';
import { Router } from '@angular/router';
import { DepartmentModel } from '../../../model/department.model';
import { TeacherModel } from '../../../model/teacher.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-teacher',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-teacher.html',
  styleUrl: './add-teacher.css',
})
export class AddTeacher implements OnInit{
departments:DepartmentModel[]=[]
teacher:TeacherModel={name:'',email:'',designation:'',cellNo:'',departmentId:''}
isEditMode=false
  constructor(
    private teacherService:TeacherService,
    private deptService:DepartmentService,
    private cdr :ChangeDetectorRef,
    private router:Router
  ){}
  ngOnInit(): void {
   this.loadAllDept();
  }

  
loadAllDept(){
  this.deptService.getAllDept().subscribe(
    {
next:(data)=>{
  this.departments=data;
  this.cdr.markForCheck();
  console.log(data);
},
error:(err)=>{
  console.log(err);
}
    }
  );
}

save(){
if(this.isEditMode){this.teacherService.update(this.teacher).subscribe(
  {
    next:()=>{
      console.log("Data Updated");
      this.goBack();
    },
    error:(err)=>{
      console.log(err);
    }
  }
);
}

  else {

      this.teacherService.save(this.teacher).subscribe(
{
          next: () => {
            console.log("Data Saved");
            this.goBack();
          },
          error: (err) => {
            console.log(err);
 }
    }
      );
 }
  }
goBack(){
  this.router.navigate(['/allTeacher']);
}

}

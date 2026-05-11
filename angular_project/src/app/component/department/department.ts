import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DepartmentModel } from '../../model/department.model';
import { DepartmentService } from '../../services/department.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  imports: [CommonModule,FormsModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {
departments:DepartmentModel[]=[]
department:DepartmentModel={name:'',email:''}
isEdit= false
constructor(
  private deptservice:DepartmentService,
  private cdr:ChangeDetectorRef
){}
  ngOnInit(): void {
    this.loadAllDept();
  }

loadAllDept(){
  this.deptservice.getAllDept().subscribe(
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

saveDepartment() {

    if (this.isEdit) {
      // UPDATE
      this.deptservice.update(this.department).subscribe({
        next: () => {
          this.resetForm();
          this.loadAllDept();
        },
        error: (err) => console.log(err)
      });
    } else {
      // CREATE
      this.deptservice.save(this.department).subscribe({
        next: () => {
          this.resetForm();
          this.loadAllDept();
        },
        error: (err) => console.log(err)
      });
    }
  }

   // 🔹 EDIT (SET DATA INTO FORM)
  editDepartment(dep: DepartmentModel) {
    this.department = { ...dep };
    this.isEdit = true;
  }

    // 🔹 DELETE
  deleteDepartment(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.deptservice.delete(id).subscribe({
        next: () => this.loadAllDept(),
        error: (err) => console.log(err)
      });
    }
  }

    // 🔹 RESET FORM
  resetForm() {
    this.department = { id: '', name: '', email: '' };
   this.isEdit = false;
  }

}

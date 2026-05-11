import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { email } from '@angular/forms/signals';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { StudentMOdel } from '../../../model/student.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-student',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-edit-student.html',
  styleUrl: './add-edit-student.css',
})
export class AddEditStudent implements OnInit {

  student: StudentMOdel = { name: '', email: '', cellNo: '', fee: 0 };
  isEditMode = false;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.studentService.getById(id).subscribe(
        {
          next: (data) => {
            this.student = data;
            this.cdr.markForCheck();
          },
          error: (err) => {
            console.log(err);
          }
        });
}
  }
  save(){
if(this.isEditMode){this.studentService.updateStudent(this.student).subscribe(
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

      this.studentService.saveStudent(this.student).subscribe(
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
    this.router.navigate(['/all_stu']);
  }
}




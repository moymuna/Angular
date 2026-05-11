import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentMOdel } from '../../../model/student.model';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-list-student',
  imports: [CommonModule, RouterModule],
  templateUrl: './list-student.html',
  styleUrl: './list-student.css',
})
export class ListStudent implements OnInit {
  students: StudentMOdel[] = [];
  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef

  ) { }
  ngOnInit(): void {
    this.loadAllStudent();
  }
  loadAllStudent() {
    this.studentService.getAllStudents().subscribe(
      {
        next: (data) => {
          this.students = data;
          this.cdr.markForCheck();
          console.log(this.students);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }


remove(id:string){
  this.studentService.deleteStudent(id).subscribe(
    {
      next:()=>{
        console.log("Success");
        this.loadAllStudent();
      },
      error:(err)=>{
        console.log(err);
      }
    }
  );
}




}

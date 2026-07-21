import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseCard} from '../../components/course-card/course-card';
@Component({
  selector: 'app-course-list',
  standalone:true,
  imports: [CommonModule,CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {
  courses=[
    {
      id:1,name:'Angular',code:'CS101',credits:4
    },
    {
      id:2,name:'Java',code:'CS102',credits:3
    },
    {
      id:3,name:'Python',code:'CS103',credits:4
    }
  ];
  selectedCourseId:number | null=null;
  onEnroll(courseId:number)
  {
    console.log(
      'Enrolling in course: '+courseId);
      this.selectedCourseId=courseId;
  }
}

import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  enrolledCourses$!: Observable<Course[]>;

  constructor(private readonly enrollmentService: EnrollmentService) {
    this.enrolledCourses$ = this.enrollmentService.getEnrolledCourses();
  }
}

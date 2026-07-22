import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { CourseService } from './course';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private enrolledCourseIds = new Set<number>();

  constructor(private readonly courseService: CourseService) {}

  enroll(courseId: number): void {
    this.enrolledCourseIds.add(courseId);
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds.delete(courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.has(courseId);
  }

  getEnrolledCourses(): Observable<Course[]> {
    return this.courseService.getCourses().pipe(
      map((courses) => courses.filter((course) => this.enrolledCourseIds.has(course.id)))
    );
  }
}
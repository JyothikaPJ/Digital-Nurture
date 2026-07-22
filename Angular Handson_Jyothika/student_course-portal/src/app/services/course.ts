import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly apiUrl = 'http://localhost:3000/courses';
  private courses: Course[] = [
    { id: 1, name: 'Angular Fundamentals', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'TypeScript Essentials', code: 'TS102', credits: 3, gradeStatus: 'pending' },
    { id: 3, name: 'RxJS in Practice', code: 'RX103', credits: 4, gradeStatus: 'passed' },
    { id: 4, name: 'Java Basics', code: 'JV104', credits: 3, gradeStatus: 'failed' },
    { id: 5, name: 'Web APIs', code: 'WEB105', credits: 2, gradeStatus: 'pending' }
  ];

  constructor(private readonly http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(catchError(() => of([...this.courses])));
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return this.getCourses().pipe(map((courses) => courses.find((course) => course.id === id)));
  }

  addCourse(course: Omit<Course, 'id'>): Observable<Course> {
    const createdCourse = { ...course, id: this.nextId() };
    this.courses = [...this.courses, createdCourse];
    return this.http.post<Course>(this.apiUrl, course).pipe(catchError(() => of(createdCourse)));
  }

  updateCourse(course: Course): Observable<Course> {
    this.courses = this.courses.map((currentCourse) => (currentCourse.id === course.id ? course : currentCourse));
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(catchError(() => of(course)));
  }

  deleteCourse(id: number): Observable<void> {
    this.courses = this.courses.filter((course) => course.id !== id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(() => of(void 0)));
  }

  private nextId(): number {
    return Math.max(...this.courses.map((course) => course.id), 0) + 1;
  }
}
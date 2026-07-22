import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseCard } from '../../components/course-card/course-card';
import { HighlightDirective } from '../../directives/highlight.directive';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course';
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCard, HighlightDirective],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses: Course[] = [];
  selectedCourseId: number | null = null;
  searchTerm = '';
  isLoading = true;
  errorMessage = '';

  constructor(
    private readonly courseService: CourseService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

  openCourse(courseId: number): void {
    this.router.navigate([courseId], { relativeTo: this.route });
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: term || null },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  get visibleCourses(): Course[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.courses;
    }

    return this.courses.filter((course) =>
      [course.name, course.code, String(course.credits), course.gradeStatus]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }

  trackByCourseId(index: number, course: Course): number {
    // trackBy keeps Angular from recreating unchanged DOM nodes when the list changes.
    return course.id;
  }

  ngOnInit(): void {
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') ?? '';
    setTimeout(() => {
      this.courseService.getCourses().subscribe({
        next: (courses) => {
          this.courses = courses;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error?.message ?? 'Failed to load courses.';
          this.isLoading = false;
        }
      });
    }, 1500);
  }
}

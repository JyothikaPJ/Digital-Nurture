import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
// [property] performs one-way binding from the component to the DOM.
// [(ngModel)] performs two-way binding between the component and the DOM.
export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  availableCourses = 0;
  enrolledCourses = 3;
  gpa = 3.8;

  constructor(private readonly courseService: CourseService) {}

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.availableCourses = courses.length;
    });
    console.log('HomeComponent initialised - courses loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }
}

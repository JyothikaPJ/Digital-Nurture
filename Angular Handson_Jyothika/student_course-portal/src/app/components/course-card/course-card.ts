import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-course-card',
  standalone:true,
  imports: [CommonModule, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  @Input() course: Course = {
    id: 0,
    name: '',
    code: '',
    credits: 0,
    gradeStatus: 'pending'
  };
  @Output() enrollRequested = new EventEmitter<number>();
  @Output() courseSelected = new EventEmitter<number>();

  isExpanded = false;

  constructor(public readonly enrollmentService: EnrollmentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('Course input changed', changes['course'].previousValue, changes['course'].currentValue);
    }
  }

  get cardClasses(): Record<string, boolean> {
    return {
      'card--enrolled': this.course ? this.enrollmentService.isEnrolled(this.course.id) : false,
      'card--full': !!this.course && this.course.credits >= 4,
      expanded: this.isExpanded
    };
  }

  get borderColor(): string {
    switch (this.course?.gradeStatus) {
      case 'passed':
        return '#15803d';
      case 'failed':
        return '#b91c1c';
      default:
        return '#6b7280';
    }
  }

  toggleDetails(event: MouseEvent): void {
    event.stopPropagation();
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick(event: MouseEvent): void {
    event.stopPropagation();
    if (this.enrollmentService.isEnrolled(this.course.id)) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }

    this.enrollRequested.emit(this.course.id);
  }
}


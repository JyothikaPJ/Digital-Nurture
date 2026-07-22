import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css'
})
export class EnrollmentForm {
  studentName = '';
  studentEmail = '';
  courseId = '';
  preferredSemester = 'Odd';
  agreeToTerms = false;
  submitted = false;

  onSubmit(form: NgForm): void {
    console.log(form.value);
    console.log(form.valid);
    this.submitted = true;
  }

  resetForm(form: NgForm): void {
    form.resetForm({ preferredSemester: 'Odd' });
    this.submitted = false;
  }
}
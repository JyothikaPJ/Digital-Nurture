import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const value = String(control.value ?? '').toLowerCase();
      resolve(value.includes('test@') ? { emailTaken: true } : null);
    }, 800);
  });
}

function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '');
  return value.startsWith('XX') ? { noCourseCode: true } : null;
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentForm implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: this.fb.control('', [Validators.required, Validators.email], [simulateEmailCheck as AsyncValidatorFn]),
      courseId: ['', [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  get additionalCourses(): FormArray<FormControl<string>> {
    return this.enrollForm.get('additionalCourses') as FormArray<FormControl<string>>;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.nonNullable.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.enrollForm.value);
    // getRawValue() includes disabled controls, whereas value excludes them.
    console.log(this.enrollForm.getRawValue());
    this.submitted = true;
  }

  canDeactivate(): boolean {
    return !this.enrollForm?.dirty || window.confirm('You have unsaved changes. Leave?');
  }
}
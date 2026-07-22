import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';
import { vi } from 'vitest';

import { CourseCard } from './course-card';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the course name', () => {
    fixture.componentRef.setInput('course', { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' });
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('h3')).nativeElement.textContent).toContain('Data Structures');
  });

  it('emits the course id when enroll is clicked', () => {
    fixture.componentRef.setInput('course', { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' });
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.enrollRequested, 'emit');

    fixture.debugElement.query(By.css('button')).nativeElement.click();

    expect(emitSpy).toHaveBeenCalledWith(1);
  });

  it('logs when the course input changes', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    component.ngOnChanges({
      course: new SimpleChange(undefined, { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' }, true)
    });

    expect(consoleSpy).toHaveBeenCalled();
  });
});

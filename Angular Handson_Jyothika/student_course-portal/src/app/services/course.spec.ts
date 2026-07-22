import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { CourseService } from './course';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loads courses from the API endpoint', async () => {
    const coursesPromise = firstValueFrom(service.getCourses());

    httpMock.expectOne('http://localhost:3000/courses').flush([
      { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
      { id: 2, name: 'RxJS', code: 'RX102', credits: 3, gradeStatus: 'pending' }
    ]);

    await expect(coursesPromise).resolves.toHaveLength(2);
  });

  it('falls back to local courses when the API fails', async () => {
    const coursesPromise = firstValueFrom(service.getCourses());

    httpMock.expectOne('http://localhost:3000/courses').flush('error', { status: 500, statusText: 'Server Error' });

    await expect(coursesPromise).resolves.toHaveLength(5);
  });
});
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly loadingSubject = new BehaviorSubject(false);
  readonly isLoading$ = this.loadingSubject.asObservable();

  setLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }
}
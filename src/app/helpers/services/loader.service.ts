import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";



@Injectable()
export class LoadingService {
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  getLoading():Observable<boolean> {
    return this.isLoading.asObservable();
  }

  setLoading(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading: boolean = false;
  constructor() {}

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }
}

// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoaderService {
//   private isLoadingSubject = new BehaviorSubject<boolean>(false);
//   isLoading = this.isLoadingSubject.asObservable();

//   showLoading() {
//     this.isLoadingSubject.next(true);
//   }

//   hideLoading() {
//     this.isLoadingSubject.next(false);
//   }
// }

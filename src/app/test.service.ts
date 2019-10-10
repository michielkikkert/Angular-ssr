import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { STORE_KEY } from './serverstate/state.key';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
      private http: HttpClient,
      @Inject(PLATFORM_ID) private platformKey,
      private transferState: TransferState
  ) { }


  getData(): Observable<any> {
      if (isPlatformBrowser(this.platformKey) && this.transferState.hasKey(STORE_KEY)){
          return of(this.transferState.get(STORE_KEY, null));
      } else {
          return this.http.get('https://customer.cloudworkers.dev');
      }
  }

}

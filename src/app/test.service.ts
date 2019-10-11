import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { STORE_KEY1 } from './serverstate/state.key';

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
      if (isPlatformBrowser(this.platformKey) && this.transferState.hasKey(makeStateKey('test'))){
          return of(this.transferState.get(makeStateKey('test'), null));
      } else {
          return this.http.get('https://customer.cloudworkers.dev');
      }
  }

}

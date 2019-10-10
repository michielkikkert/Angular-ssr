import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MIKE_KEY } from './app.module';
import { isPlatformBrowser } from '@angular/common';
import { TransferState } from '@angular/platform-browser';
import { from, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';


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
      if (isPlatformBrowser(this.platformKey)){
          console.log(this.transferState.get(MIKE_KEY, null));
          return of(this.transferState.get(MIKE_KEY, null));
      } else {
          return this.http.get('https://customer.cloudworkers.dev').pipe(
              tap( data => this.transferState.set(MIKE_KEY, data)),
              tap( console.log )
          );
      }
  }

}

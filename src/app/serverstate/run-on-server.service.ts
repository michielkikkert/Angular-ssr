import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class RunOnServerService {

    constructor(
        @Inject(PLATFORM_ID) private platformKey,
        private transferState: TransferState
    ) {}

    /*
        Okay - it was fun writing this... however, Angular surprises again - and already has a build-in mechanism to prevent duplicate calls..
        import { TransferHttpCacheModule } from '@nguniversal/common'; will do the trick... D'oh!
        ..... however - that module uses an Http interceptor and catches ALL GET requests with no control. This means that if there are API calls that depend
        on client cookies - those will also not be (re-) fetched on the browser. In those cases - instead of using the TransferHttpCache - you can use this service.
     */

    register( request: Observable<any>, key: string = null, seed: any = '' ) {

        if( !key ) { console.warn('[runOnServer] - You need to provide a unique key for this request if you want it to run exclusively on the server'); return request };

        const stateKey = makeStateKey(key + JSON.stringify(seed));

        if (isPlatformBrowser(this.platformKey) && this.transferState.hasKey(stateKey)) {
            const currentState = this.transferState.get(stateKey, null);
            this.transferState.remove(stateKey);
            return of(currentState);
        } else {
            return request.pipe(
                tap( data => {
                    if(!isPlatformBrowser(this.platformKey)){
                        this.transferState.set( stateKey, data);
                    }
                })
            )
        }

    }

}

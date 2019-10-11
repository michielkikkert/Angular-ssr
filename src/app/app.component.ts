import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import * as testActions from './store';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

    constructor(
        private store: Store<any>,
        private title: Title,
        @Inject(PLATFORM_ID) private platformKey,
    ) {}

    ngOnInit(): void {

        this.store.dispatch(testActions.loadData());

        if ( !isPlatformBrowser(this.platformKey )) {
            this.title.setTitle('SSR PoC - SERVER');
        }

    }
}

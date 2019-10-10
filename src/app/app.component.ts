import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as testActions from './store';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'ssr';
    data$: Observable<any> = this.store.pipe( select(testActions.getTestData) );

    constructor(
        private store: Store<any>
    ) {}

    ngOnInit(): void {

        this.store.dispatch(testActions.loadData());

    }
}

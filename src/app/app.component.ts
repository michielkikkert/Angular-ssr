import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as testActions from './store';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'ssr';

    constructor(
        private store: Store<any>
    ) {}

    ngOnInit(): void {

        this.store.dispatch(testActions.loadData());

    }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as testActions from '../../store';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    data$: Observable<any> = this.store.pipe(select(testActions.getTestData));

    constructor(
        private store: Store<any>
    ) {
    }

    ngOnInit() {
    }

}

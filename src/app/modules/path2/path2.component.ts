import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as testActions from '../../store';

@Component({
  selector: 'app-path2',
  templateUrl: './path2.component.html',
  styleUrls: ['./path2.component.scss']
})
export class Path2Component implements OnInit {

    data$: Observable<any> = this.store.pipe(select(testActions.getTestData));

    constructor(
        private store: Store<any>
    ) {
    }


    ngOnInit() {
  }

}

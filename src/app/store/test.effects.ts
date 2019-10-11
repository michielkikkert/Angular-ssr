import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as testActions from './test.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TestService } from '../test.service';

@Injectable()
export class TestEffects {
    constructor(private actions$: Actions, private store: Store<any>, private service: TestService) {}

    getData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(testActions.loadData),
            switchMap(() => {
                return this.service.getData().pipe(
                    map((response: any[]) => testActions.loadDataSuccess({ response })),
                    catchError(error => of(testActions.loadDataFail({ error })))
                );
            })
        )
    );

    getMoreData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(testActions.loadMoreData),
            switchMap(() => {
                return this.service.getOtherData().pipe(
                    map((response: any[]) => testActions.loadMoreDataSuccess({ response })),
                    catchError(error => of(testActions.loadMoreDataFail({ error })))
                );
            })
        )
    );
}

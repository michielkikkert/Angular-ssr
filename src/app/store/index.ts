import { reducer, TestState } from './test.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { TestEffects } from './test.effects';
import * as fromRouter from '@ngrx/router-store';

export * from './test.actions';
export * from './test.reducer';
export * from './test.effects'
export * from './test.selectors';

export interface State {
    test: TestState;
    router: fromRouter.RouterReducerState<any>
}

export const reducers: ActionReducerMap<any> = {
    test: reducer,
    router: fromRouter.routerReducer
};


export const effects: any[] = [TestEffects];

import { Action, createReducer, on } from '@ngrx/store';
import * as testActions from './test.actions';

export interface TestState {
    test: string;
}

export const initialState: TestState = {
    test: 'initial state'
};


const testReducer = createReducer(
    initialState,
    on(
        testActions.loadDataSuccess,
        (state, {response}) => {
            return {
                ...state,
                test: response
            }
        }
    )
);


export function reducer(state: TestState | undefined, action: Action) {
    return testReducer(state, action);
}

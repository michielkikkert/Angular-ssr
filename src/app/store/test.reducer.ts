import { Action, createReducer, on } from '@ngrx/store';
import * as testActions from './test.actions';

export interface TestState {
    data: any;
    moredata: any
}

export const initialState: TestState = {
    data: 'initial state for data',
    moredata: 'initial state for more data'
};


const testReducer = createReducer(
    initialState,
    on(
        testActions.loadDataSuccess,
        (state, {response}) => {
            return {
                ...state,
                data: response
            }
        }
    ),
    on(
        testActions.loadMoreDataSuccess,
        (state, {response}) => {
            return {
                ...state,
                moredata: response
            }
        }
    )
);


export function reducer(state: TestState | undefined, action: Action) {
    return testReducer(state, action);
}

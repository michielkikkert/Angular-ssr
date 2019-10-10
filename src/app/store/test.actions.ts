import { createAction, props } from '@ngrx/store';

export const loadData = createAction('[TEST] Load data');

export const loadDataSuccess = createAction('[TEST] Load data Success', props<{response: any}>());

export const loadDataFail = createAction('[TEST] Load data Fail', props<{error: any}>());

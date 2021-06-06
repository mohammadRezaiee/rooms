import {createAction} from '@reduxjs/toolkit';

export const apiCallBegan = createAction('api/callBegan');
export const apiCallSuccess = createAction('api/CallSuccess');
export const apiCallFailed = createAction('api/callFailed');

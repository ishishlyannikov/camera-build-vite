import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { rootReducer } from '../root-reducer';
import browserHistory from '../../browser-history/browser-history.ts';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (action.type === 'APP/redirectToRoute') {
    browserHistory.push(action.payload);
  }

  return next(action);
};

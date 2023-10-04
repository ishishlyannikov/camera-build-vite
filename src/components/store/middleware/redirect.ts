import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history/browser-history';
import { Middleware } from '@reduxjs/toolkit';
import { rootReducer } from '../root-reducer.ts';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'app/redirectToRoute') {
          browserHistory.push(action.payload);
        }
        return next(action);
      };

import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../../const.ts';

export const redirectToRoute = createAction<AppRoute>('APP/redirectToRoute');

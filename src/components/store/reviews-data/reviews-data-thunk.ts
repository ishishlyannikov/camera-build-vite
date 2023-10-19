import { createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from '../../../types/types.ts';
import { ThunkAPI } from '../../../types/state.ts';
import { APIRoute, NameSpace } from '../../../const.ts';
import { generatePath } from 'react-router-dom';

export const fetchReviewsAction = createAsyncThunk<Review[], string, ThunkAPI>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (cameraId, { extra: api }) => {
    const { data } = await api.get<Review[]>(generatePath(APIRoute.Reviews, { cameraId: cameraId }));
    return data;
  },
);

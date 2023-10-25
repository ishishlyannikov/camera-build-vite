import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostReview, Review } from '../../../types/types.ts';
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

export const postReviewAction = createAsyncThunk<Review, PostReview, ThunkAPI>(
  `${NameSpace.Reviews}/postReview`,
  async ({ cameraId, userName, advantage, disadvantage, review, rating }, { extra: api }) => {
    const { data } = await api.post<Review>(APIRoute.PostReview, {
      cameraId,
      userName,
      advantage,
      disadvantage,
      review,
      rating,
    });
    return data;
  },
);

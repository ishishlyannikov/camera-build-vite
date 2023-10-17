import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product, Review } from '../../../types/types.ts';
import { ThunkAPI } from '../../../types/state.ts';
import { APIRoute, NameSpace } from '../../../const.ts';
import { generatePath } from 'react-router-dom';

export const fetchSimilarProductsAction = createAsyncThunk<Product[], string, ThunkAPI>(
  `${NameSpace.Camera}/fetchSimilarProducts`,
  async (cameraId, { extra: api }) => {
    const { data } = await api.get<Product[]>(generatePath(APIRoute.Similar, { cameraId: cameraId }));
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, ThunkAPI>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (cameraId, { extra: api }) => {
    const { data } = await api.get<Review[]>(generatePath(APIRoute.Reviews, { cameraId: cameraId }));
    return data;
  },
);

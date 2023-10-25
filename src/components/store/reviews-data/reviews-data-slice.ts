import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const.ts';
import { fetchReviewsAction, postReviewAction } from './reviews-data-thunk.ts';
import { ReviewsData } from '../../../types/state.ts';
import { toast } from 'react-toastify';

const initialState: ReviewsData = {
  reviews: [],
  status: Status.Idle,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.status = Status.Success;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.status = Status.Error;
        toast.warn('Невозможно отправить отзыв');
      });
  },
});

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const.ts';
import { fetchReviewsAction, postReviewAction } from './reviews-data-thunk.ts';
import { ReviewsData } from '../../../types/state.ts';

const initialState: ReviewsData = {
  reviews: [],
  status: Status.Idle,
  isAddReviewPopupOpened: false,
  currentRating: 0,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    setCurrentRating: (state, action: PayloadAction<number>) => {
      state.currentRating = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  },
});

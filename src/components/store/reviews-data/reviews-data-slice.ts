import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../../const.ts';
import { fetchReviewsAction } from './reviews-data-thunk.ts';
import { ReviewsData } from '../../../types/state.ts';

const initialState: ReviewsData = {
  reviews: [],
  status: Status.Idle,
  isAddReviewPopupOpened: false,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    setAddReviewPopupStatus: (state, action: PayloadAction<boolean>) => {
      state.isAddReviewPopupOpened = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchReviewsAction.fulfilled, (state, action) => {
      state.reviews = action.payload;
    });
  },
});

export const { setAddReviewPopupStatus } = reviewsData.actions;

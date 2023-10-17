import { NameSpace, Status } from '../../../const.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchReviewsAction, fetchSimilarProductsAction } from './product-data-thunk.ts';
import { ProductData } from '../../../types/state.ts';

const initialState: ProductData = {
  similarProducts: [],
  status: Status.Idle,
  isSimilarDataLoading: false,
  reviews: [],
};
export const productData = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.isSimilarDataLoading = true;
        state.status = Status.Loading;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
        state.isSimilarDataLoading = false;
        state.status = Status.Success;
      })
      .addCase(fetchSimilarProductsAction.rejected, (state) => {
        state.isSimilarDataLoading = false;
        state.status = Status.Error;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  },
});

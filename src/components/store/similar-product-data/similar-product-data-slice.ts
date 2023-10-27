import { NameSpace, Status } from '../../../const.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchSimilarProductsAction } from './similar-product-data-thunk.ts';
import { SimilarData } from '../../../types/state.ts';

const initialState: SimilarData = {
  similarProducts: [],
  status: Status.Idle,
  isSimilarDataLoading: false,
};
export const similarData = createSlice({
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
      });
  },
});

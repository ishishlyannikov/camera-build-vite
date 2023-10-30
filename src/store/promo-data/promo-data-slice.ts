import { PromoData } from '../../types/state.ts';
import { NameSpace, Status } from '../../const.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPromoAction } from './promo-data-thunk.ts';

const initialState: PromoData = {
  promo: [],
  status: Status.Idle,
  isPromoLoading: false,
};
export const promoData = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoLoading = true;
        state.status = Status.Loading;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoLoading = false;
        state.status = Status.Success;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isPromoLoading = false;
        state.status = Status.Error;
      });
  },
});

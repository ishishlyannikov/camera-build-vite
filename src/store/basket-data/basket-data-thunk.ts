import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkAPI } from '../../types/state';
import { APIRoute, NameSpace } from '../../const';
import { Order } from '../../types/types.ts';

export const postCouponAction = createAsyncThunk<number, string, ThunkAPI>(
  `${NameSpace.Basket}/ postCoupon`,
  async (coupon, { extra: api }) => {
    const { data } = await api.post<number>(APIRoute.Coupon, { coupon });
    return data;
  },
);

export const postOrderAction = createAsyncThunk<number, Order, ThunkAPI>(
  `${NameSpace.Basket}/postOrder`,
  async ({ camerasIds, coupon }, { extra: api }) => {
    const { data } = await api.post<number>(APIRoute.Order, { camerasIds, coupon });
    return data;
  },
);

import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkAPI} from "../../../types/state.ts";
import {APIRoute, NameSpace} from "../../../const.ts";
import {PromoProduct} from "../../../types/types.ts";

export const fetchPromoAction = createAsyncThunk<PromoProduct[], undefined, ThunkAPI> (
  `${NameSpace.Promo}/fetchPromo`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PromoProduct[]>(APIRoute.Promo);
    return data;
  },
);

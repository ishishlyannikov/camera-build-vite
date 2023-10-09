import { AxiosInstance } from 'axios';
import {store} from "../components/store";
import {Product, PromoProduct} from "./types.ts";
import {Status} from "../const.ts";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkAPI = {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  state: State;
}

export type CamerasData = {
  catalog: Product[];
  status: Status;
  isCamerasDataLoading: boolean;
};

export type PromoData = {
  promo: PromoProduct[];
  status: Status;
  isPromoLoading: boolean
};
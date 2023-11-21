import { AxiosInstance } from 'axios';
import { store } from '../store';
import { Product, PromoProduct, Review } from './types.ts';
import { ModalName, SortBy, SortOrder, Status } from '../const.ts';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkAPI = {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  state: State;
};

export type CamerasData = {
  catalog: Product[];
  status: Status;
  isCamerasDataLoading: boolean;
  product: Product | null;
  isProductDataLoading: boolean;
  modalName: ModalName;
  selectedProduct: Product | null;
  sortBy: SortBy | null;
  sortOrder: SortOrder | null;
  currentPage: number;
};

export type PromoData = {
  promo: PromoProduct[];
  status: Status;
  isPromoLoading: boolean;
};

export type SimilarData = {
  similarProducts: Product[];
  status: Status;
  isSimilarDataLoading: boolean;
};

export type ReviewsData = {
  reviews: Review[];
  status: Status;
  isReviewsDataLoading: boolean;
};

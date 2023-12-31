import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const.ts';
import { camerasData } from './cameras-data/cameras-data-slice.ts';
import { promoData } from './promo-data/promo-data-slice.ts';
import { similarData } from './similar-product-data/similar-product-data-slice.ts';
import { reviewsData } from './reviews-data/reviews-data-slice.ts';
import { basketData } from './basket-data/basket-data-slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.Camera]: camerasData.reducer,
  [NameSpace.Promo]: promoData.reducer,
  [NameSpace.Product]: similarData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.Basket]: basketData.reducer,
});

import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { camerasData } from './cameras-data/cameras-data-slice.ts';
import { promoData } from './promo-data/promo-data-slice.ts';
import { productData } from './product-data/product-data-slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.Camera]: camerasData.reducer,
  [NameSpace.Promo]: promoData.reducer,
  [NameSpace.Product]: productData.reducer,
});

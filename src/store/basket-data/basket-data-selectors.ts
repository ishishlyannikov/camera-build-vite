import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';

export const getBasketProductsList = (state: State) => state[NameSpace.Basket].basketProductsList;

export const getDiscount = (state: State) => state[NameSpace.Basket].discount;

export const getPromoCode = (state: State) => state[NameSpace.Basket].promoCode;

export const getIsValidPromoCode = (state: State) => state[NameSpace.Basket].isPromoCodeValid;

export const getPostOrderStatus = (state: State) => state[NameSpace.Basket].status;

export const getCamerasIds = createSelector([getBasketProductsList], (productsList) => {
  const camerasIds: number[] = [];
  productsList.forEach((item) => camerasIds.push(item.id));
  return camerasIds;
});

export const getIsPromoCodeError = (state: State): boolean => state[NameSpace.Basket].isPromoCodeError;

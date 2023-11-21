import { ModalName, NameSpace, SortBy, SortOrder } from '../../const.ts';
import { State } from '../../types/state.ts';
import { Product } from '../../types/types.ts';
import { createSelector } from '@reduxjs/toolkit';
import { sortedProductList } from '../../utils.ts';

export const getCamerasList = (state: State): Product[] => state[NameSpace.Camera].catalog;

export const getIsCamerasDataStatusLoading = (state: State): boolean => state[NameSpace.Camera].isCamerasDataLoading;

export const getProduct = (state: State): Product | null => state[NameSpace.Camera].product;

export const getIsProductDataLoading = (state: State): boolean => state[NameSpace.Camera].isProductDataLoading;

export const getModalName = (state: State): ModalName => state[NameSpace.Camera].modalName;

export const getSelectedProduct = (state: State) => state[NameSpace.Camera].selectedProduct;

export const getSortBy = (state: State): SortBy | null => state[NameSpace.Camera].sortBy;

export const getSortOrder = (state: State): SortOrder | null => state[NameSpace.Camera].sortOrder;

export const getCurrentPage = (state: State): number => state[NameSpace.Camera].currentPage;

export const getSortedCatalog = createSelector(
  [getCamerasList, getSortBy, getSortOrder],
  (camerasList, sortType, sortOrder) => sortedProductList(camerasList, sortType, sortOrder),
);

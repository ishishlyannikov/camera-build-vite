import { CameraCategory, CameraLevel, CameraType, ModalName, NameSpace, SortBy, SortOrder } from '../../const.ts';
import { State } from '../../types/state.ts';
import { Product } from '../../types/types.ts';
import { createSelector } from '@reduxjs/toolkit';
import { filterCameras, sortedProductList } from '../../utils.ts';

export const getCamerasList = (state: State): Product[] => state[NameSpace.Camera].catalog;

export const getIsCamerasDataStatusLoading = (state: State): boolean => state[NameSpace.Camera].isCamerasDataLoading;

export const getProduct = (state: State): Product | null => state[NameSpace.Camera].product;

export const getIsProductDataLoading = (state: State): boolean => state[NameSpace.Camera].isProductDataLoading;

export const getModalName = (state: State): ModalName => state[NameSpace.Camera].modalName;

export const getSelectedProduct = (state: State) => state[NameSpace.Camera].selectedProduct;

export const getSortBy = (state: State): SortBy | null => state[NameSpace.Camera].sortBy;

export const getSortOrder = (state: State): SortOrder | null => state[NameSpace.Camera].sortOrder;

export const getCategoryFilter = (state: State): CameraCategory | null => state[NameSpace.Camera].cameraCategory;

export const getTypeFilter = (state: State): CameraType[] => state[NameSpace.Camera].cameraType;

export const getLevelFilter = (state: State): CameraLevel[] => state[NameSpace.Camera].cameraLevel;

export const getMinPrice = (state: State): number => state[NameSpace.Camera].minPrice;

export const getMaxPrice = (state: State): number => state[NameSpace.Camera].maxPrice;

export const getSortedCatalog = createSelector(
  [getCamerasList, getSortBy, getSortOrder],
  (camerasList, sortType, sortOrder) => sortedProductList(camerasList, sortType, sortOrder),
);

export const getFilteredCatalog = createSelector(
  [getSortedCatalog, getCategoryFilter, getTypeFilter, getLevelFilter, getMinPrice, getMaxPrice],
  (cameras, category, type, level, minPrice, maxPrice) =>
    filterCameras(cameras, category, type, level, minPrice, maxPrice),
);

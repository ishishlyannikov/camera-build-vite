import { Product, Review } from './types/types.ts';
import { SortBy, SortOrder } from './const.ts';

export function compare(a: Review, b: Review) {
  const dateA = new Date(a.createAt);
  const dateB = new Date(b.createAt);
  return Number(dateB) - Number(dateA);
}

export const sortTypeMap = {
  [SortBy.Popular]: (camerasList: Product[]) => [...camerasList].sort((a, b) => b.rating - a.rating),
  [SortBy.Price]: (camerasList: Product[]) => [...camerasList].sort((a, b) => b.price - a.price),
};

export const sortOrderMap = {
  [SortOrder.Up]: (camerasList: Product[]) => camerasList.reverse(),
  [SortOrder.Down]: (camerasList: Product[]) => camerasList,
};

export const sortedProductList = (camerasList: Product[], sortType: SortBy | null, sortOrder: SortOrder | null) => {
  const sortedProductListByType = sortType ? sortTypeMap[sortType](camerasList) : [...camerasList];
  return sortOrder ? sortOrderMap[sortOrder](sortedProductListByType) : [...camerasList];
};

import { State } from '../../../types/state.ts';
import { Product, Review } from '../../../types/types.ts';
import { NameSpace } from '../../../const.ts';

export const getSimilarProducts = (state: State): Product[] => state[NameSpace.Product].similarProducts;

export const getIsSimilarDataLoading = (state: State): boolean => state[NameSpace.Product].isSimilarDataLoading;

export const getReviews = (state: State): Review[] => state[NameSpace.Product].reviews;

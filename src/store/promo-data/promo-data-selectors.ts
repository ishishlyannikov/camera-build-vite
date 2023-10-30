import { State } from '../../types/state.ts';
import { PromoProduct } from '../../types/types.ts';
import { NameSpace } from '../../const.ts';

export const getPromo = (state: State): PromoProduct[] => state[NameSpace.Promo].promo;

export const isPromoLoading = (state: State): boolean => state[NameSpace.Promo].isPromoLoading;

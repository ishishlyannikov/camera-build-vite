import {NameSpace, Status} from "../../../const.ts";
import {State} from "../../../types/state.ts";
import {PromoProduct} from "../../../types/types.ts";

export const getPromo = (state: State): PromoProduct[] => state[NameSpace.Promo].promo;
export const getStatus = (state: State): Status => state[NameSpace.Promo].status;

export const isPromoLoading = (state: State): boolean => state[NameSpace.Promo].isPromoLoading;

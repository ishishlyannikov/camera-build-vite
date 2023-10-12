import {NameSpace} from "../../../const.ts";
import {State} from "../../../types/state.ts";
import {Product} from "../../../types/types.ts";

export const getCamerasList = (state: State): Product[] => state[NameSpace.Camera].catalog;

export const getIsCamerasDataStatusLoading = (state: State): boolean => state[NameSpace.Camera].isCamerasDataLoading;

export const getProduct = (state: State): Product | null => state[NameSpace.Camera].product;

export const getIsProductDataLoading = (state: State): boolean => state[NameSpace.Camera].isProductDataLoading;

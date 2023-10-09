import {NameSpace} from "../../../const.ts";
import {State} from "../../../types/state.ts";
import {Product} from "../../../types/types.ts";

export const getCamerasList = (state: State): Product[] => state[NameSpace.Camera].catalog;

export const isCamerasDataStatusLoading = (state: State): boolean => state[NameSpace.Camera].isCamerasDataLoading;



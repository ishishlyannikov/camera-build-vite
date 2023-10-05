import {NameSpace, Status} from "../../../const.ts";
import {State} from "../../../types/state.ts";
import {Product} from "../../../types/types.ts";

export const getCamerasList = (state: State): Product[] => state[NameSpace.Camera].catalog;
export const getStatus = (state: State): Status => state[NameSpace.Camera].status;

export const isCamerasDataStatusLoading = (state: State): boolean => state[NameSpace.Camera].isCamerasDataLoading;

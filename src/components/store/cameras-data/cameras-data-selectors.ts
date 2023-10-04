import {NameSpace} from "../../../const.ts";
import {State} from "../../../types/state.ts";

export const getCamerasList = (state: State) => state[NameSpace.Cameras].CamerasList;

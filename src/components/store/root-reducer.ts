import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import {camerasData} from "./cameras-data/cameras-data-slice.ts";


export const rootReducer = combineReducers({
  [NameSpace.Camera]: camerasData.reducer,
});

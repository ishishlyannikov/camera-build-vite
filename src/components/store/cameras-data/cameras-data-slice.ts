import {NameSpace} from "../../../const.ts";
import {Product} from "../../../types/types.ts";
import {createSlice} from '@reduxjs/toolkit';
import { fetchCamerasAction } from './cameras-data-thunk';

type InitialState = {
  CamerasList: Product[];
};

const initialState: InitialState = {
  CamerasList: [],
};

export const camerasData = createSlice ({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.CamerasList = action.payload;
      });
  }
});

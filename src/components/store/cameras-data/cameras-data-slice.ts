import {NameSpace, Status} from "../../../const.ts";
import {Product} from "../../../types/types.ts";
import {createSlice} from '@reduxjs/toolkit';
import { fetchCamerasAction } from './cameras-data-thunk';

type CatalogSlice = {
  catalog: Product[];
  status: Status;
  isCamerasDataLoading: boolean
};

const initialState: CatalogSlice = {
  catalog: [],
  status: Status.Idle,
  isCamerasDataLoading: false,
};
export const camerasData = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCamerasDataLoading = true;
        state.status = Status.Loading;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.catalog = action.payload;
        state.isCamerasDataLoading = false;
        state.status = Status.Success;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isCamerasDataLoading = false;
        state.status = Status.Error;
      })
  }
});

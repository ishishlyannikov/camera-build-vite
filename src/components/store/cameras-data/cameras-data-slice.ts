import { NameSpace, Status } from '../../../const.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCamerasAction, fetchProductAction } from './cameras-data-thunk';
import { CamerasData } from '../../../types/state.ts';
import { Product } from '../../../types/types.ts';

const initialState: CamerasData = {
  catalog: [],
  status: Status.Idle,
  isCamerasDataLoading: false,
  product: null,
  isProductDataLoading: false,
  isModalOpened: false,
  selectedProduct: null,
};
export const camerasData = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {
    setModalAddStatus: (state, action: PayloadAction<boolean>) => {
      state.isModalOpened = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
  },
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
      .addCase(fetchProductAction.pending, (state) => {
        state.isProductDataLoading = true;
        state.status = Status.Loading;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isProductDataLoading = false;
        state.status = Status.Success;
      })
      .addCase(fetchProductAction.rejected, (state) => {
        state.isProductDataLoading = false;
        state.status = Status.Error;
      });
  },
});

export const { setModalAddStatus, setSelectedProduct } = camerasData.actions;

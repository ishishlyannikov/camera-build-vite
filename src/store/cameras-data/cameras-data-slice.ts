import { ModalName, NameSpace, SortBy, SortOrder, Status } from '../../const.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCamerasAction, fetchProductAction } from './cameras-data-thunk.ts';
import { CamerasData } from '../../types/state.ts';
import { Product } from '../../types/types.ts';

const initialState: CamerasData = {
  catalog: [],
  status: Status.Idle,
  isCamerasDataLoading: false,
  product: null,
  isProductDataLoading: false,
  modalName: ModalName.Empty,
  selectedProduct: null,
  sortBy: null,
  sortOrder: null,
  currentPage: 1,
};
export const camerasData = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<ModalName>) => {
      state.modalName = action.payload;
    },
    setCloseModal: (state) => {
      state.modalName = ModalName.Empty;
    },
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    setSortBy: (state, action: { payload: SortBy }) => {
      state.sortBy = action.payload;
      if (!state.sortOrder) {
        state.sortOrder = SortOrder.Up;
      }
    },
    setSortOrder: (state, action: { payload: SortOrder }) => {
      state.sortOrder = action.payload;
      if (!state.sortBy) {
        state.sortBy = SortBy.Price;
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
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

export const { setModal, setCloseModal, setSelectedProduct, setSortOrder, setSortBy, setCurrentPage } =
  camerasData.actions;

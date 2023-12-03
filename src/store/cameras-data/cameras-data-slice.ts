import {
  CameraCategory,
  CameraLevel,
  CameraType,
  ModalName,
  NameSpace,
  SortBy,
  SortOrder,
  Status,
} from '../../const.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCamerasAction, fetchProductAction } from './cameras-data-thunk.ts';
import { CamerasData } from '../../types/state.ts';
import { Product } from '../../types/types.ts';
import { toast } from 'react-toastify';

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
  cameraCategory: null,
  cameraType: [],
  cameraLevel: [],
  minPrice: 0,
  maxPrice: 0,
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
    setCategoryFilter: (state, action: { payload: CameraCategory | null }) => {
      state.cameraCategory = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<CameraType>) => {
      const data = action.payload.split(',');
      if (state.cameraType.some((value) => data.includes(value))) {
        state.cameraType = state.cameraType.filter((type) => type !== action.payload);
        return;
      }
      state.cameraType.push(...(data as CameraType[]));
    },
    setLevelFilter: (state, action: PayloadAction<CameraLevel>) => {
      const data = action.payload.split(',');
      if (state.cameraLevel.some((value) => data.includes(value))) {
        state.cameraLevel = state.cameraLevel.filter((level) => level !== action.payload);
        return;
      }
      state.cameraLevel.push(...(data as CameraLevel[]));
    },
    setMinPrice: (state, action: { payload: number }) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: { payload: number }) => {
      state.maxPrice = action.payload;
    },
    setFiltersReset: (state) => {
      state.cameraCategory = null;
      state.cameraType = [];
      state.cameraLevel = [];
      state.minPrice = 0;
      state.maxPrice = 0;
      state.sortBy = null;
      state.sortOrder = null;
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
        toast.warn('Ошибка загрузки товаров');
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
        toast.warn('Ошибка загрузки выбранного товара');
      });
  },
});

export const {
  setModal,
  setCloseModal,
  setSelectedProduct,
  setSortOrder,
  setSortBy,
  setCategoryFilter,
  setTypeFilter,
  setLevelFilter,
  setFiltersReset,
  setMaxPrice,
  setMinPrice,
} = camerasData.actions;

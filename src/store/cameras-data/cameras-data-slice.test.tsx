import { makeFakeCameraItem, makeFakeCameraList } from '../../utils-for-tests/mocks.ts';
import { fetchCamerasAction, fetchProductAction } from './cameras-data-thunk.ts';
import { CameraCategory, CameraLevel, CameraType, ModalName, SortBy, SortOrder, Status } from '../../const.ts';
import { camerasData, setFiltersReset, setSortBy, setSortOrder } from './cameras-data-slice.ts';

describe('Cameras Data Slice', () => {
  const initialState = {
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
  const emptyAction = { type: '' };

  describe('fetchCamerasAction', () => {
    it('should return initial state with empty action', () => {
      const expectedState = { ...initialState };

      const result = camerasData.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should set "isCamerasDataLoading" to "true" with "fetchCamerasAction.pending"', () => {
      const expectedState = {
        ...initialState,
        status: Status.Loading,
        isCamerasDataLoading: true,
      };

      const result = camerasData.reducer(undefined, fetchCamerasAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "catalog" to array with products, "isCamerasDataLoading" to "false" with "fetchCamerasAction.fulfilled"', () => {
      const mockCameras = makeFakeCameraList();
      const expectedState = {
        ...initialState,
        status: Status.Success,
        catalog: [...mockCameras],
      };

      const result = camerasData.reducer(undefined, fetchCamerasAction.fulfilled(mockCameras, '', undefined));

      expect(result).toEqual(expectedState);
    });

    it('should set "isCamerasDataLoading" to "false" with "fetchCamerasAction.rejected', () => {
      const expectedState = {
        ...initialState,
        status: Status.Error,
      };

      const result = camerasData.reducer(undefined, fetchCamerasAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchProductAction', () => {
    it('should return initial state with empty action', () => {
      const expectedState = { ...initialState };

      const result = camerasData.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action', () => {
      const expectedState = { ...initialState };

      const result = camerasData.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should set "isProductDataLoading" to "true" with "fetchProductAction.pending"', () => {
      const expectedState = {
        ...initialState,
        status: Status.Loading,
        isProductDataLoading: true,
      };

      const result = camerasData.reducer(undefined, fetchProductAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "product", "isProductDataLoading" to "false" with "fetchProductAction.fulfilled"', () => {
      const mockCamera = makeFakeCameraItem();
      const expectedState = {
        ...initialState,
        status: Status.Success,
        product: { ...mockCamera },
      };

      const result = camerasData.reducer(undefined, fetchProductAction.fulfilled(mockCamera, '', ''));

      expect(result).toEqual(expectedState);
    });

    it('should set "isProductDataLoading" to "false" with "fetchProductAction.rejected', () => {
      const expectedState = {
        ...initialState,
        status: Status.Error,
      };

      const result = camerasData.reducer(undefined, fetchProductAction.rejected);

      expect(result).toEqual(expectedState);
    });

    it('should set sort order to "Up" when sortBy action is used, if there is no sort order', () => {
      const expectedState = {
        ...initialState,
        sortBy: SortBy.Price,
        sortOrder: SortOrder.Up,
      };

      const result = camerasData.reducer(undefined, setSortBy(SortBy.Price));

      expect(result).toEqual(expectedState);
    });

    it('should set sort type to "Price" when sortOrder action is used, if there is no sort type', () => {
      const expectedState = {
        ...initialState,
        sortBy: SortBy.Price,
        sortOrder: SortOrder.Down,
      };

      const result = camerasData.reducer(undefined, setSortOrder(SortOrder.Down));

      expect(result).toEqual(expectedState);
    });

    it('should reset filters with "setFiltersReset" action', () => {
      const state = {
        ...initialState,
        sortBy: SortBy.Price,
        sortOrder: SortOrder.Up,
        cameraCategory: CameraCategory.Videocamera,
        cameraType: [CameraType.Collection, CameraType.Digital],
        cameraLevel: [CameraLevel.Professional, CameraLevel.Zero],
        minPrice: 5000,
        maxPrice: 150000,
      };
      const expectedState = {
        ...initialState,
      };

      const result = camerasData.reducer(state, setFiltersReset);

      expect(result).toEqual(expectedState);
    });
  });
});

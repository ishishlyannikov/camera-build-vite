import { makeFakeCameraItem, makeFakeCameraList } from '../../utils-for-tests/mocks.ts';
import { fetchCamerasAction, fetchProductAction } from './cameras-data-thunk.ts';
import { ModalName, Status } from '../../const.ts';
import { camerasData } from './cameras-data-slice.ts';

describe('Cameras Data Slice', () => {
  const initialState = {
    catalog: [],
    status: Status.Idle,
    isCamerasDataLoading: false,
    product: null,
    isProductDataLoading: false,
    modalName: ModalName.Empty,
    selectedProduct: null,
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
  });
});

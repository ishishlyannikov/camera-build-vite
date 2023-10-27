import { similarData } from './similar-product-data-slice.ts';
import { fetchSimilarProductsAction } from './similar-product-data-thunk.ts';
import { makeFakeSimilarProducts } from '../../../utils-for-tests/mocks.ts';
import { Status } from '../../../const.ts';

describe('Similar Product Data Slice', () => {
  const emptyAction = { type: '' };
  const initialState = {
    similarProducts: [],
    status: Status.Idle,
    isSimilarDataLoading: false,
  };

  it('should return initial state with empty action', () => {
    const expectedState = { ...initialState };

    const result = similarData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const expectedState = { ...initialState };

    const result = similarData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isSimilarDataLoading" to "true" with "fetchSimilarProductsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      status: Status.Loading,
      isSimilarDataLoading: true,
    };

    const result = similarData.reducer(undefined, fetchSimilarProductsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "promos" to array with promo, "isSimilarDataLoading" to "false" with "fetchSimilarProductsAction.fulfilled"', () => {
    const mockSimilar = makeFakeSimilarProducts();
    const expectedState = {
      ...initialState,
      status: Status.Success,
      similarProducts: [...mockSimilar],
    };

    const result = similarData.reducer(undefined, fetchSimilarProductsAction.fulfilled(mockSimilar, '', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "isSimilarDataLoading" to "false" with "fetchSimilarProductsAction.rejected', () => {
    const expectedState = {
      ...initialState,
      status: Status.Error,
    };

    const result = similarData.reducer(undefined, fetchSimilarProductsAction.rejected);

    expect(result).toEqual(expectedState);
  });
});

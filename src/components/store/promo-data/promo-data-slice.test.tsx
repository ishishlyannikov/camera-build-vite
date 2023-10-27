import { fetchPromoAction } from './promo-data-thunk.ts';
import { makeFakePromoList } from '../../../utils-for-tests/mocks.ts';
import { promoData } from './promo-data-slice.ts';
import { Status } from '../../../const.ts';

describe('Promo Data Slice', () => {
  const emptyAction = { type: '' };
  const initialState = {
    promo: [],
    status: Status.Idle,
    isPromoLoading: false,
  };

  it('should return initial state with empty action', () => {
    const expectedState = { ...initialState };

    const result = promoData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const expectedState = { ...initialState };

    const result = promoData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isPromoLoading" to "true" with "fetchPromoAction.pending"', () => {
    const expectedState = {
      ...initialState,
      status: Status.Loading,
      isPromoLoading: true,
    };

    const result = promoData.reducer(undefined, fetchPromoAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "promos" to array with promo, "isPromoLoading" to "false" with "fetchPromoAction.fulfilled"', () => {
    const mockPromos = makeFakePromoList();
    const expectedState = {
      ...initialState,
      status: Status.Success,
      promo: [...mockPromos],
    };

    const result = promoData.reducer(undefined, fetchPromoAction.fulfilled(mockPromos, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "isPromoLoading" to "false" with "fetchPromoAction.rejected', () => {
    const expectedState = {
      ...initialState,
      status: Status.Error,
    };

    const result = promoData.reducer(undefined, fetchPromoAction.rejected);

    expect(result).toEqual(expectedState);
  });
});

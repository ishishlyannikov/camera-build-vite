import { describe } from 'vitest/dist/index.js';
import { DiscountCoupon, Status } from '../../const';
import { postCouponAction, postOrderAction } from './basket-data-thunk.ts';
import { basketData } from './basket-data-slice.ts';

describe('Basket Data Slice', () => {
  const emptyAction = { type: '' };
  const initialState = {
    basketProductsList: [],
    discount: 0,
    promoCode: null,
    isPromoCodeError: false,
    isPromoCodeValid: false,
    status: Status.Idle,
  };

  describe('postCouponAction', () => {
    it('should return initial state with empty action', () => {
      const expectedState = { ...initialState };

      const result = basketData.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action', () => {
      const expectedState = { ...initialState };

      const result = basketData.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should set isPromoCodeError to "false" and isPromoCodeValid to "false" with "postCouponAction.pending"', () => {
      const originalState = {
        ...initialState,
        isPromoCodeValid: true,
        isPromoCodeError: true,
      };

      const expectedState = {
        ...initialState,
        isPromoCodeValid: false,
        isPromoCodeError: false,
      };

      const result = basketData.reducer(originalState, postCouponAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set number of "discount", "isPromoCodeValid" to "true" with "postCouponAction.fulfilled"', () => {
      const expectedState = {
        ...initialState,
        discount: 15,
        isPromoCodeValid: true,
      };

      const result = basketData.reducer(undefined, postCouponAction.fulfilled(15, '', DiscountCoupon['camera-333']));

      expect(result).toEqual(expectedState);
    });

    it('should set "isPromoCodeError" to "true" & "discount" to "0" with "postCouponAction.rejected', () => {
      const expectedState = {
        ...initialState,
        isPromoCodeError: true,
        discount: 0,
      };

      const result = basketData.reducer(undefined, postCouponAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });

  describe('postOrderAction', () => {
    it('should set status to "loading" with "postOrderAction.pending"', () => {
      const expectedState = {
        ...initialState,
        status: Status.Loading,
      };

      const result = basketData.reducer(undefined, postOrderAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set  status to "success" with "postOrderAction.fulfilled"', () => {
      const expectedState = {
        ...initialState,
        status: Status.Success,
      };

      const result = basketData.reducer(
        undefined,
        postOrderAction.fulfilled(12, '', { camerasIds: [1, 2], coupon: DiscountCoupon['camera-333'] }),
      );

      expect(result).toEqual(expectedState);
    });

    it('should set "status" to "error" with "postOrderAction.rejected', () => {
      const expectedState = {
        ...initialState,
        status: Status.Error,
      };

      const result = basketData.reducer(undefined, postOrderAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });
});

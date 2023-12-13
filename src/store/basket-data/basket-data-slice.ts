import { DiscountCoupon, NameSpace, Status } from '../../const';
import { Product } from '../../types/types.ts';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BasketData } from '../../types/state.ts';
import { getBasketListFromLS, getDiscountLS, getPromoCodeLS } from '../../utils.ts';
import { postCouponAction, postOrderAction } from './basket-data-thunk.ts';
import { toast } from 'react-toastify';

const { productsList } = getBasketListFromLS();
const { promo } = getPromoCodeLS();
const { promoDiscount } = getDiscountLS();

const initialState: BasketData = {
  basketProductsList: productsList,
  discount: promoDiscount,
  promoCode: promo,
  status: Status.Idle,
  isPromoCodeValid: false,
  isPromoCodeError: false,
};

export const basketData = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    setBasketAdd: (state, action: PayloadAction<Product>) => {
      if (!state.basketProductsList.some((item) => item.id === action.payload.id)) {
        state.basketProductsList.push({ ...action.payload, count: 1 });
      } else {
        state.basketProductsList = state.basketProductsList.map((item) =>
          item.id === action.payload.id ? { ...item, count: item.count + 1 } : item,
        );
      }
      localStorage.setItem('basket', JSON.stringify(state.basketProductsList));
    },
    setBasketRemove: (state, action: PayloadAction<number>) => {
      state.basketProductsList = state.basketProductsList.filter((item) => item.id !== action.payload);
      localStorage.setItem('basket', JSON.stringify(state.basketProductsList));
    },
    setBasketItemCount: (state, action: PayloadAction<{ id: number; count: number }>) => {
      state.basketProductsList = state.basketProductsList.map((item) =>
        item.id === action.payload.id ? { ...item, count: action.payload.count } : item,
      );
      localStorage.setItem('basket', JSON.stringify(state.basketProductsList));
    },
    setPromoCode: (state, action: PayloadAction<DiscountCoupon>) => {
      state.promoCode = action.payload;
    },
    setBasketReset: (state) => {
      state.basketProductsList = [];
      state.discount = 0;
      state.promoCode = null;
      state.isPromoCodeValid = false;
      state.status = Status.Idle;
      localStorage.removeItem('promo');
      localStorage.removeItem('discount');
      localStorage.removeItem('basket');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postCouponAction.pending, (state) => {
        state.isPromoCodeValid = false;
        state.isPromoCodeError = false;
      })
      .addCase(postCouponAction.fulfilled, (state, action: PayloadAction<number>) => {
        state.discount = action.payload;
        state.isPromoCodeValid = true;
        state.isPromoCodeError = false;
        localStorage.setItem('promo', JSON.stringify(state.promoCode));
        localStorage.setItem('discount', JSON.stringify(state.discount));
      })
      .addCase(postCouponAction.rejected, (state) => {
        state.discount = 0;
        state.isPromoCodeValid = false;
        state.isPromoCodeError = true;
        localStorage.removeItem('promo');
        localStorage.removeItem('discount');
      })
      .addCase(postOrderAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.status = Status.Success;
        toast.warn('Ваш заказ успешно отправлен!');
      })
      .addCase(postOrderAction.rejected, (state) => {
        state.status = Status.Error;
        toast.warn('Произошла ошибка отправки заказа. Попробуйте позже');
      });
  },
});

export const { setBasketAdd, setBasketRemove, setBasketItemCount, setBasketReset, setPromoCode } = basketData.actions;

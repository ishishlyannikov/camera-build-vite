import { NameSpace } from '../../const';
import { Product } from '../../types/types.ts';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BasketData } from '../../types/state.ts';
import { getBasketListFromLS } from '../../utils.ts';

const { productsList } = getBasketListFromLS();

const initialState: BasketData = {
  basketProductsList: productsList,
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
  },
  extraReducers: {},
});

export const { setBasketAdd, setBasketRemove, setBasketItemCount } = basketData.actions;

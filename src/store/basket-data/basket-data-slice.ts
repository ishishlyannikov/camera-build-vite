import { NameSpace } from '../../const';
import { Product } from '../../types/types.ts';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BasketData } from '../../types/state.ts';

const initialState: BasketData = {
  basketProductsList: [],
};

export const basketData = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addProductToBasket: (state, action: PayloadAction<Product>) => {
      if (!state.basketProductsList.includes(action.payload)) {
        state.basketProductsList.push(action.payload);
      }
    },
  },
  extraReducers: {},
});

export const { addProductToBasket } = basketData.actions;

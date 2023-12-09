import { NameSpace } from '../../const';
import { Product } from '../../types/types.ts';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  basketProductList: Product[];
};

const initialState: InitialState = {
  basketProductList: [],
};

export const basketData = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addProductToBasket: (state, action: PayloadAction<Product>) => {
      if (!state.basketProductList.includes(action.payload)) {
        state.basketProductList.push(action.payload);
      }
    },
  },
  extraReducers: {},
});

export const { addProductToBasket } = basketData.actions;

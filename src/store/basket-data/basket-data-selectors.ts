import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getBasketProductList = (state: State) => state[NameSpace.Basket].basketProductList;

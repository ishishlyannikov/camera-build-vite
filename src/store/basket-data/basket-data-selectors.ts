import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getBasketProductsList = (state: State) => state[NameSpace.Basket].basketProductsList;

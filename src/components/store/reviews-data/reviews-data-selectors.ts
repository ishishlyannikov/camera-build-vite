import { NameSpace } from '../../../const.ts';
import { State } from '../../../types/state.ts';
import { Review } from '../../../types/types.ts';

export const getAddReviewPopupStatus = (state: State) => state[NameSpace.Reviews].isAddReviewPopupOpened;

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;

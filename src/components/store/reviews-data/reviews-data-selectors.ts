import { NameSpace } from '../../../const.ts';
import { State } from '../../../types/state.ts';
import { Review } from '../../../types/types.ts';
import { Status } from '../../../const.ts';

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;
export const getPostReviewStatus = (state: State): Status => state[NameSpace.Reviews].status;

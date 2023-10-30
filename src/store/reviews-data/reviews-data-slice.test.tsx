import { fetchReviewsAction, postReviewAction } from './reviews-data-thunk.ts';
import { makeFakeReviewList } from '../../utils-for-tests/mocks.ts';
import { Status } from '../../const.ts';
import { reviewsData } from './reviews-data-slice.ts';

describe('Reviews Data Slice', () => {
  const emptyAction = { type: '' };
  const initialState = {
    reviews: [],
    isReviewsDataLoading: false,
    status: Status.Idle,
  };

  it('should return initial state with empty action', () => {
    const expectedState = { ...initialState };

    const result = reviewsData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const expectedState = { ...initialState };

    const result = reviewsData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewsDataLoading" to "true" with "fetchReviewsAction.pending"', () => {
    const expectedState = {
      ...initialState,
      isReviewsDataLoading: true,
    };

    const result = reviewsData.reducer(undefined, fetchReviewsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to array with review, "isReviewsDataLoading" to "false" with "fetchReviewsAction.fulfilled"', () => {
    const mockReviews = makeFakeReviewList();
    const expectedState = {
      ...initialState,
      reviews: mockReviews,
    };

    const result = reviewsData.reducer(undefined, fetchReviewsAction.fulfilled(mockReviews, '', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewsDataLoading" to "false" with "fetchReviewsAction.rejected', () => {
    const expectedState = {
      ...initialState,
    };

    const result = reviewsData.reducer(undefined, fetchReviewsAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should post new comment and add it to array with comments, "fetchReviewsAction" to "false" with "postReviewAction.fulfilled"', () => {
    const mockReviews = makeFakeReviewList();
    const postReview = makeFakeReviewList()[0];
    const allReviews = [postReview, ...mockReviews];

    const initialStatePost = {
      ...initialState,
      reviews: mockReviews,
    };

    const expectedState = {
      ...initialState,
      reviews: allReviews,
      status: Status.Success,
    };

    const result = reviewsData.reducer(initialStatePost, {
      type: postReviewAction.fulfilled.type,
      payload: postReview,
    });

    expect(result).toEqual(expectedState);
  });
});

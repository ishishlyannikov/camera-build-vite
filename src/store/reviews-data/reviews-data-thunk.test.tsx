import {
  extractActionsTypes,
  makeFakeCameraItem,
  makeFakePostReview,
  makeFakeReviewList,
} from '../../utils-for-tests/mocks.ts';
import { generatePath } from 'react-router-dom';
import { APIRoute } from '../../const.ts';
import { fetchReviewsAction, postReviewAction } from './reviews-data-thunk.ts';
import { createAPI } from '../../services/api.ts';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state.ts';
import { Action } from 'redux';
import { AppThunkDispatch } from '../cameras-data/cameras-data-thunk.test.tsx';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ CAMERA: { catalog: [] } });
  });

  describe('fetchReviewsAction', () => {
    const mockCameraItem = makeFakeCameraItem();
    const mockReviews = makeFakeReviewList();

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter
        .onGet(generatePath(APIRoute.Reviews, { cameraId: mockCameraItem.id.toString() }))
        .reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(mockCameraItem.id.toString()));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchReviewsAction.pending.type, fetchReviewsAction.fulfilled.type]);

      expect(fetchReviewsActionFulfilled.payload).toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(generatePath(APIRoute.Reviews, { cameraId: mockCameraItem.id.toString() })).reply(400, []);

      await store.dispatch(fetchReviewsAction(mockCameraItem.id.toString()));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchReviewsAction.pending.type, fetchReviewsAction.rejected.type]);
    });
  });

  describe('postReviewAction', () => {
    const mockPostReview = makeFakePostReview();
    const { cameraId, userName, advantage, disadvantage, review, rating } = mockPostReview;

    it('should dispatch "postReviewAction.pending", "postReviewAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter
        .onPost(APIRoute.PostReview, { cameraId, userName, advantage, disadvantage, review, rating })
        .reply(200, mockPostReview);

      await store.dispatch(postReviewAction({ cameraId, userName, advantage, disadvantage, review, rating }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postReviewActionFulfilled = emittedActions.at(1) as ReturnType<typeof postReviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([postReviewAction.pending.type, postReviewAction.fulfilled.type]);

      expect(postReviewActionFulfilled.payload).toEqual(mockPostReview);
    });

    it('should dispatch "postReviewAction.pending", "postReviewAction.rejected" when server response 400', async () => {
      mockAxiosAdapter
        .onPost(APIRoute.PostReview, { cameraId, userName, advantage, disadvantage, review, rating })
        .reply(400, []);

      await store.dispatch(postReviewAction({ cameraId, userName, advantage, disadvantage, review, rating }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([postReviewAction.pending.type, postReviewAction.rejected.type]);
    });
  });
});

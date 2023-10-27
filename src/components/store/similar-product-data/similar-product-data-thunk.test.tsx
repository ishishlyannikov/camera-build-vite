import { extractActionsTypes, makeFakeCameraItem, makeFakeSimilarProducts } from '../../../utils-for-tests/mocks.ts';
import { generatePath } from 'react-router-dom';
import { APIRoute } from '../../../const.ts';
import { fetchSimilarProductsAction } from './similar-product-data-thunk.ts';
import { createAPI } from '../../services/api.ts';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../../types/state.ts';
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

  describe('fetchSimilarProductsAction', () => {
    const mockCameraItem = makeFakeCameraItem();
    const mockSimilarList = makeFakeSimilarProducts();

    it('should dispatch "fetchSimilarProductsAction.pending", "fetchSimilarProductsAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter
        .onGet(generatePath(APIRoute.Similar, { cameraId: mockCameraItem.id.toString() }))
        .reply(200, mockSimilarList);

      await store.dispatch(fetchSimilarProductsAction(mockCameraItem.id.toString()));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarProductsActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchSimilarProductsAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarProductsAction.pending.type,
        fetchSimilarProductsAction.fulfilled.type,
      ]);

      expect(fetchSimilarProductsActionFulfilled.payload).toEqual(mockSimilarList);
    });

    it('should dispatch "fetchSimilarProductsAction.pending", "fetchSimilarProductsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(generatePath(APIRoute.Similar, { cameraId: mockCameraItem.id.toString() })).reply(400, []);

      await store.dispatch(fetchSimilarProductsAction(mockCameraItem.id.toString()));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchSimilarProductsAction.pending.type, fetchSimilarProductsAction.rejected.type]);
    });
  });
});

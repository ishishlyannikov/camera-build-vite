import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { generatePath } from 'react-router-dom';
import { State } from '../../types/state.ts';
import { createAPI } from '../../services/api.ts';
import { makeFakeCameraItem, makeFakeCameraList } from '../../utils-for-tests/mocks.ts';
import { APIRoute } from '../../const.ts';
import { fetchCamerasAction, fetchProductAction } from './cameras-data-thunk.ts';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ CAMERA: { catalog: [] } });
  });

  describe('fetchCamerasAction', () => {
    it('should dispatch "fetchCamerasAction.pending", "fetchCamerasAction.fulfilled", when server response 200', async () => {
      const mockCameraList = makeFakeCameraList();
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(200, mockCameraList);

      await store.dispatch(fetchCamerasAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCamerasActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCamerasAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchCamerasAction.pending.type, fetchCamerasAction.fulfilled.type]);

      expect(fetchCamerasActionFulfilled.payload).toEqual(mockCameraList);
    });

    it('should dispatch "fetchCamerasAction.pending", "fetchCamerasAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Cameras).reply(400, []);

      await store.dispatch(fetchCamerasAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchCamerasAction.pending.type, fetchCamerasAction.rejected.type]);
    });
  });

  describe('fetchProductAction', () => {
    const mockCameraItem = makeFakeCameraItem();

    it('should dispatch "fetchProductAction.pending", "fetchProductAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter
        .onGet(generatePath(APIRoute.Product, { cameraId: mockCameraItem.id.toString() }))
        .reply(200, mockCameraItem);

      await store.dispatch(fetchProductAction(mockCameraItem.id.toString()));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchProductActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchProductAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchProductAction.pending.type, fetchProductAction.fulfilled.type]);

      expect(fetchProductActionFulfilled.payload).toEqual(mockCameraItem);
    });

    it('should dispatch "fetchProductAction.pending", "fetchProductAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(generatePath(APIRoute.Product, { cameraId: mockCameraItem.id.toString() })).reply(400, []);

      await store.dispatch(fetchProductAction(mockCameraItem.id.toString()));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchProductAction.pending.type, fetchProductAction.rejected.type]);
    });
  });
});

import { extractActionsTypes, makeFakePromoList } from '../../utils-for-tests/mocks.ts';
import { APIRoute } from '../../const.ts';
import { fetchPromoAction } from './promo-data-thunk.ts';
import { fetchCamerasAction } from '../cameras-data/cameras-data-thunk.ts';
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

  describe('fetchPromoAction', () => {
    it('should dispatch "fetchPromoAction.pending", "fetchPromoAction.fulfilled", when server response 200', async () => {
      const mockPromoList = makeFakePromoList();
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromoList);

      await store.dispatch(fetchPromoAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCamerasAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchPromoAction.pending.type, fetchPromoAction.fulfilled.type]);

      expect(fetchPromoActionFulfilled.payload).toEqual(mockPromoList);
    });

    it('should dispatch "fetchPromoAction.pending", "fetchPromoAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

      await store.dispatch(fetchPromoAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchPromoAction.pending.type, fetchPromoAction.rejected.type]);
    });
  });
});

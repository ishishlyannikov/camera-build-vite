import thunk from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { createAPI } from '../../services/api.ts';
import { AppThunkDispatch } from '../cameras-data/cameras-data-thunk.test.tsx';
import { APIRoute } from '../../const.ts';
import { postCouponAction } from './basket-data-thunk.ts';
import { extractActionsTypes } from '../../utils-for-tests/mocks.ts';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ CAMERA: { catalog: [] } });
  });

  describe('postCouponAction', () => {
    it('should dispatch "postCouponAction.pending", "postCouponAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onPost(APIRoute.Coupon, { coupon: 'camera-333' }).reply(200, 15);
      await store.dispatch(postCouponAction('camera-333'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postCouponActionFulfilled = emittedActions.at(1) as ReturnType<typeof postCouponAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([postCouponAction.pending.type, postCouponAction.fulfilled.type]);

      expect(postCouponActionFulfilled.payload).toEqual(15);
    });
    it('should dispatch "postCouponAction.pending", "postCouponAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(APIRoute.Coupon, { coupon: 'camera-333' }).reply(400, []);

      await store.dispatch(postCouponAction('camera-333'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([postCouponAction.pending.type, postCouponAction.rejected.type]);
    });
  });
});

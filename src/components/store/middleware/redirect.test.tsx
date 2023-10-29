import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import { State } from '../../../types/state.ts';
import { AnyAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history/browser-history.ts';
import { AppRoute } from '../../../const.ts';
import { redirectToRoute } from '../action.ts';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    },
  },
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/" with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.Main };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Main);
  });

  it('should redirect to "/basket" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Basket);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Basket);
  });
});

import { AxiosInstance } from 'axios';
import {store} from "../components/store";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkAPI = {
  dispatch: AppDispatch;
  extra: AxiosInstance;
  state: State;
}

import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkAPI} from "../../../types/state.ts";
import {APIRoute, NameSpace} from "../../../const.ts";
import {Product} from "../../../types/types.ts";

export const fetchCamerasAction = createAsyncThunk<Product[], undefined, ThunkAPI> (
  `${NameSpace.Camera}/fetchCameras`,
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Product[]>(APIRoute.Cameras);
    return data;
  },
);

export const fetchProductAction = createAsyncThunk<Product, string, ThunkAPI>(
    `${NameSpace.Camera}/fetchProduct`,
    async (cameraId, { extra: api }) => {
        const {data} = await api.get<Product>(`${APIRoute.Cameras}/${cameraId}`);
        return data;
    }
);

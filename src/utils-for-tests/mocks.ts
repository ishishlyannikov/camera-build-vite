import { Action } from 'redux';
import { CameraCategory, CameraLevel, CameraType, ModalName, Status } from '../const';
import { faker } from '@faker-js/faker';
import { PostReview, Product, PromoProduct, Review } from '../types/types.ts';
import { State } from '../types/state.ts';

export const makeFakeCameraItem = (): Product => ({
  id: faker.helpers.rangeToNumber({ min: 1, max: 50000000 }),
  name: faker.vehicle.bicycle(),
  previewImg: faker.system.filePath(),
  previewImg2x: faker.system.filePath(),
  previewImgWebp: faker.system.filePath(),
  previewImgWebp2x: faker.system.filePath(),
  vendorCode: faker.vehicle.vrm(),
  type: faker.helpers.enumValue(CameraType),
  category: faker.helpers.enumValue(CameraCategory),
  description: faker.lorem.words({ min: 5, max: 15 }),
  level: faker.helpers.enumValue(CameraLevel),
  price: faker.helpers.rangeToNumber({ min: 1000, max: 100000 }),
  rating: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
  reviewCount: faker.helpers.rangeToNumber({ min: 0, max: 15 }),
});

export const makeFakeCameraList = (): Product[] => Array.from({ length: 20 }, makeFakeCameraItem);

export const makeFakePromoList = (): PromoProduct[] =>
  new Array(3).fill(null).map(() => ({
    id: faker.helpers.rangeToNumber({ min: 1, max: 50000000 }),
    name: faker.vehicle.bicycle(),
    previewImg: faker.system.filePath(),
    previewImg2x: faker.system.filePath(),
    previewImgWebp: faker.system.filePath(),
    previewImgWebp2x: faker.system.filePath(),
  }));

export const makeFakeReviewList = (): Review[] =>
  new Array(10).fill(null).map(() => ({
    cameraId: faker.helpers.rangeToNumber({ min: 1, max: 50000000 }),
    userName: faker.person.firstName(),
    advantage: faker.lorem.words({ min: 3, max: 9 }),
    disadvantage: faker.lorem.words({ min: 3, max: 9 }),
    review: faker.lorem.words({ min: 3, max: 9 }),
    rating: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
    id: faker.string.uuid(),
    createAt: new Date().toISOString(),
  }));

export const makeFakePostReview = (): PostReview => ({
  cameraId: faker.helpers.rangeToNumber({ min: 1, max: 50000000 }),
  userName: faker.person.firstName(),
  advantage: faker.lorem.words({ min: 3, max: 9 }),
  disadvantage: faker.lorem.words({ min: 3, max: 9 }),
  review: faker.lorem.words({ min: 3, max: 9 }),
  rating: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
});

export const makeFakeSimilarProducts = (): Product[] => Array.from({ length: 10 }, makeFakeCameraItem);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  CAMERA: {
    catalog: [],
    status: Status.Idle,
    isCamerasDataLoading: false,
    product: null,
    isProductDataLoading: false,
    modalName: ModalName.Empty,
    selectedProduct: null,
    sortBy: null,
    sortOrder: null,
    cameraCategory: null,
    cameraType: [],
    cameraLevel: [],
    minPrice: 0,
    maxPrice: 0,
  },
  PROMO: {
    promo: [],
    isPromoLoading: false,
    status: Status.Idle,
  },
  PRODUCT: {
    similarProducts: [],
    status: Status.Idle,
    isSimilarDataLoading: false,
  },
  REVIEWS: {
    reviews: [],
    status: Status.Idle,
    isReviewsDataLoading: false,
  },
  ...(initialState ?? {}),
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

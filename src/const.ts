export enum AppRoute {
  Main = '/',
  Product = '/product',
  Basket = '/basket',
}
export enum NameSpace {
  Camera = 'CAMERA',
  Product = 'PRODUCT',
  Order = 'ORDERS',
  Reviews = 'REVIEWS',
  Promo = 'PROMO',
  Coupon = 'COUPON',
}

export enum APIRoute {
  Cameras = '/cameras',
  Product = '/cameras/:cameraId',
  Similar = '/cameras/:cameraId/similar',
  Promo = '/promo',
  Reviews = '/cameras/:cameraId/reviews',
  PostReview = '/reviews',
  Coupon = '/coupons',
  Order = '/orders',
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export enum ModalName {
  Reviews = 'Reviews',
  SuccessForm = 'SuccessForm',
  AddToBasket = 'AddToBasket',
  Empty = '',
}

export const CARDS_PER_PAGE = 9;

export const RATINGS = [1, 2, 3, 4, 5] as const;

export const MIN_COMMENTS_LENGTH = 2;

export const MAX_COMMENTS_LENGTH = 160;

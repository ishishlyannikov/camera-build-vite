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
  Coupon = '/coupons',
  Order = '/orders',
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export const CARDS_PER_PAGE = 9;

export const RATINGS = [1, 2, 3, 4, 5] as const;

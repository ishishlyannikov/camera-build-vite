export enum AppRoute {
  Main = '/',
  Product = '/product',
  Basket = '/basket',
}

export enum NameSpace {
  Camera = 'CAMERA',
  Order = 'ORDERS',
  Reviews = 'REVIEWS',
  Promo = 'PROMO',
  Coupon = 'COUPON',
}

export enum APIRoute {
  Cameras = '/cameras',
  CameraItem = '/cameras/:cameraId',
  Similar = '/cameras/:cameraId/similar',
  Promo = '/promo',
  Reviews = '/cameras/:cameraId/reviews',
  ReviewPost = '/reviews',
  Coupon = '/coupon',
  Order = '/orders',
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

export const CARDS_PER_PAGE = 9

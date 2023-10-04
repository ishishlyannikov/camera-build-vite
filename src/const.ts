export enum AppRoute {
  Main = '/',
  Product = '/product',
  Basket = '/basket',
}

export enum NameSpace {
  Cameras = 'CAMERAS',
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

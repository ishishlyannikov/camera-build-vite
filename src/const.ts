export enum AppRoute {
  Main = '/',
  Product = '/product',
  Basket = '/basket',
  NotFound = '/404',
}

export enum NameSpace {
  Camera = 'CAMERA',
  Product = 'PRODUCT',
  Order = 'ORDERS',
  Reviews = 'REVIEWS',
  Promo = 'PROMO',
  Coupon = 'COUPON',
  Basket = 'BASKET',
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
  SuccessAdd = 'SuccessAdd',
  RemoveItem = 'RemoveItem',
}

export enum CommentsLength {
  Min = 2,
  Max = 160,
}

export enum CameraCategory {
  Photocamera = 'Фотоаппарат',
  Videocamera = 'Видеокамера',
}

export enum CameraLevel {
  Zero = 'Нулевой',
  Amateur = 'Любительский',
  Professional = 'Профессиональный',
}

export enum CameraType {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная',
}

export enum KeyboardKey {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Esc = 'Escape',
  Enter = 'Enter',
}

export enum SortBy {
  Price = 'по цене',
  Popular = 'по популярности',
}

export enum SortOrder {
  Up = 'по возрастанию',
  Down = 'по убыванию',
}

export enum QueryString {
  Sort = 'sort',
  Order = 'order',
  Category = 'category',
  Type = 'type',
  Level = 'level',
  MinPrice = 'price_gte',
  MaxPrice = 'price_lte',
}

export const FILTER_PARAMS: string[] = [
  QueryString.Level,
  QueryString.Type,
  QueryString.Category,
  QueryString.MinPrice,
  QueryString.MaxPrice,
  QueryString.Order,
  QueryString.Sort,
];
export const CARDS_PER_PAGE = 9;

export const MAX_PAGES_COUNT = 3;

export const RATINGS = [1, 2, 3, 4, 5] as const;

export const MIN_SEARCH_INPUT_LENGTH = 3;

export const SCROLLER_COUNT = 4;

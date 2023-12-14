import { BasketProduct, Product, Review } from './types/types.ts';
import { CameraCategory, CameraLevel, CameraType, SortBy, SortOrder } from './const.ts';

export function compare(a: Review, b: Review) {
  const dateA = new Date(a.createAt);
  const dateB = new Date(b.createAt);
  return Number(dateB) - Number(dateA);
}

export const sortTypeMap = {
  [SortBy.Popular]: (camerasList: Product[]) => [...camerasList].sort((a, b) => b.rating - a.rating),
  [SortBy.Price]: (camerasList: Product[]) => [...camerasList].sort((a, b) => b.price - a.price),
};

export const sortOrderMap = {
  [SortOrder.Up]: (camerasList: Product[]) => camerasList.reverse(),
  [SortOrder.Down]: (camerasList: Product[]) => camerasList,
};

export const sortProductList = (camerasList: Product[], sortType: SortBy | null, sortOrder: SortOrder | null) => {
  const sortProductListByType = sortType ? sortTypeMap[sortType](camerasList) : [...camerasList];
  return sortOrder ? sortOrderMap[sortOrder](sortProductListByType) : [...camerasList];
};

export const filterByCategory = (cameras: Product[], category: CameraCategory | null): Product[] => {
  if (!category) {
    return cameras;
  }

  return [...cameras].filter((camera) => camera.category === category);
};

export const filterByTypes = (cameras: Product[], types: CameraType[]): Product[] => {
  if (!types.length) {
    return cameras;
  }

  return [...cameras].filter((camera) => types.includes(<CameraType>camera.type));
};

export const filterByLevels = (cameras: Product[], levels: CameraLevel[]): Product[] => {
  if (!levels.length) {
    return cameras;
  }

  return [...cameras].filter((camera) => levels.includes(<CameraLevel>camera.level));
};

export const filterByPrice = (cameras: Product[], minPrice: number, maxPrice: number): Product[] => {
  if (!minPrice && !maxPrice) {
    return cameras;
  }

  if (!maxPrice) {
    maxPrice = Infinity;
  }

  return cameras.filter((camera) => camera.price >= minPrice && camera.price <= maxPrice);
};

export const filterCameras = (
  cameras: Product[],
  category: CameraCategory | null,
  types: CameraType[],
  levels: CameraLevel[],
  minPrice: number,
  maxPrice: number,
): Product[] => {
  const filteredCamerasByCategory = filterByCategory(cameras, category);
  const filteredCamerasByTypes = filterByTypes(filteredCamerasByCategory, types);
  const filteredCamerasByLevels = filterByLevels(filteredCamerasByTypes, levels);
  return filterByPrice(filteredCamerasByLevels, minPrice, maxPrice);
};
export const getPrice = (cameras: Product[], type: 'max' | 'min'): string => {
  if (!cameras.length) {
    return '';
  }

  const sortedCameras = [...cameras].sort((a, b) => a.price - b.price);

  if (type === 'max' && sortedCameras.length) {
    return sortedCameras[sortedCameras.length - 1].price.toString();
  } else {
    return sortedCameras[0].price.toString();
  }
};

export const calculateBasketSummary = (productsList: BasketProduct[]) =>
  productsList.reduce((sum, obj) => obj.price * obj.count + sum, 0);

export const getBasketListFromLS = () => {
  const data = localStorage.getItem('basket');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const productsList = data ? JSON.parse(data) : [];
  return {
    productsList: productsList as BasketProduct[],
  };
};

export const getPromoCodeLS = () => {
  const data = localStorage.getItem('promo');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const promo = data ? JSON.parse(data) : null;
  return {
    promo: promo as string,
  };
};

export const getDiscountLS = () => {
  const data = localStorage.getItem('discount');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const promoDiscount = data ? JSON.parse(data) : 0;
  return {
    promoDiscount: promoDiscount as number,
  };
};

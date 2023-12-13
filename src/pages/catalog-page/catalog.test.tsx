import { render, screen } from '@testing-library/react';
import { makeFakeCameraList, makeFakePromoList } from '../../utils-for-tests/mocks.ts';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import Catalog from './catalog.tsx';
import { ModalName, Status } from '../../const.ts';

describe('Page: Catalog', () => {
  const mockCameraList = makeFakeCameraList();
  const mockPromoList = makeFakePromoList();

  it('should render correctly with fetch.fulfilled cameras', () => {
    const { withStoreComponent } = withStore(<Catalog />, {
      CAMERA: {
        catalog: [...mockCameraList],
        isCamerasDataLoading: false,
        status: Status.Idle,
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
        promo: [...mockPromoList],
        isPromoLoading: false,
        status: Status.Idle,
      },
      BASKET: {
        basketProductsList: [],
        isPromoCodeError: false,
        isPromoCodeValid: false,
        discount: 0,
        status: Status.Idle,
        promoCode: null,
      },
    });

    const expectedText = 'Каталог фото- и видеотехники';
    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

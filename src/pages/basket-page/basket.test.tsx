import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import Basket from './basket.tsx';
import { makeFakeCameraList } from '../../utils-for-tests/mocks.ts';
import { ModalName, Status } from '../../const.ts';

describe('Page: Basket ', () => {
  const mockCameraList = makeFakeCameraList();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Basket />, {
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
      BASKET: {
        basketProductsList: [],
        isPromoCodeError: false,
        isPromoCodeValid: false,
        discount: 0,
        status: Status.Idle,
        promoCode: null,
      },
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getAllByText('Корзина').length).toBe(2);
  });
});

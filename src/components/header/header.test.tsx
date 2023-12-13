import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import { render, screen } from '@testing-library/react';
import Header from './header';
import { AppRoute, ModalName, Status } from '../../const';
import { makeFakeCameraList } from '../../utils-for-tests/mocks.ts';

describe('Component: Header', () => {
  const mockCameraList = makeFakeCameraList();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Header />, {
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

    const link: HTMLAnchorElement = screen.getByTestId('header-basket');

    expect(link.href).toContain(AppRoute.Basket);
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
    expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
  });
});

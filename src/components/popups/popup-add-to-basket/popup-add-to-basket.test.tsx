import { render, screen } from '@testing-library/react';
import PopupAddToBasket from './popup-add-to-basket.tsx';
import { withHistory, withStore } from '../../../utils-for-tests/mock-component.tsx';
import { makeFakeCameraItem } from '../../../utils-for-tests/mocks.ts';
import { ModalName, Status } from '../../../const.ts';

describe('Component: Popup Add To Basket', () => {
  const mockCamera = makeFakeCameraItem();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<PopupAddToBasket camera={{ ...mockCamera }} />, {
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
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByAltText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${mockCamera.level} уровень`)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils-for-tests/mock-component.tsx';
import PopupBasketSuccess from './popup-basket-success.tsx';
import { ModalName, Status } from '../../../const.ts';

describe('Component: Popup Basket Success', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<PopupBasketSuccess />, {
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

    expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
  });
});

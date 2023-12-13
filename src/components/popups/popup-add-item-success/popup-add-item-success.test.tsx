import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils-for-tests/mock-component.tsx';
import PopupAddItemSuccess from './popup-add-item-success.tsx';
import { ModalName, Status } from '../../../const.ts';

describe('Component: Popup Add Item Success', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<PopupAddItemSuccess />, {
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
    const expectedText = 'Товар успешно добавлен в корзину';

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });
});

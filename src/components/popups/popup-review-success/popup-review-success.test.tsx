import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils-for-tests/mock-component.tsx';
import { ModalName, Status } from '../../../const.ts';
import PopupReviewSuccess from './popup-review-success.tsx';

describe('Component: Popup Review Success', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<PopupReviewSuccess />, {
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
      REVIEWS: {
        reviews: [],
        status: Status.Idle,
        isReviewsDataLoading: false,
      },
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
  });
});

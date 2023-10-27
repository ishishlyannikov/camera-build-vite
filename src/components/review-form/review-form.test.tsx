import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import ReviewForm from './review-form.tsx';
import { ModalName, Status } from '../../const.ts';

describe('Component: Review Form', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ReviewForm />, {
      CAMERA: {
        catalog: [],
        status: Status.Idle,
        isCamerasDataLoading: false,
        product: null,
        isProductDataLoading: false,
        modalName: ModalName.Empty,
        selectedProduct: null,
      },
      REVIEWS: {
        reviews: [],
        status: Status.Idle,
        isReviewsDataLoading: false,
      },
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();
  });
});

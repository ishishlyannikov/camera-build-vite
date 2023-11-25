import { render, screen } from '@testing-library/react';
import { makeFakeReviewList } from '../../utils-for-tests/mocks.ts';
import Reviews from './reviews.tsx';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import { ModalName, Status } from '../../const.ts';

describe('Component: Reviews', () => {
  const mockReviews = makeFakeReviewList();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Reviews />, {
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
        reviews: [...mockReviews],
        status: Status.Idle,
        isReviewsDataLoading: false,
      },
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
  });
});

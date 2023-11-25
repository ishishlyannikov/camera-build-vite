import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils-for-tests/mock-component.tsx';
import PopupAddReview from './popup-add-review.tsx';
import { ModalName, Status } from '../../../const.ts';
import { makeFakeReviewList } from '../../../utils-for-tests/mocks.ts';

describe('Component: Popup Add Review', () => {
  const mockReviews = makeFakeReviewList();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<PopupAddReview />, {
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

    expect(screen.getByText(/Рейтинг/i)).toBeInTheDocument();
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваше имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();
  });
});

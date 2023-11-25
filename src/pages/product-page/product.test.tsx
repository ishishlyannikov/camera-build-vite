import { render, screen } from '@testing-library/react';
import { ModalName, Status } from '../../const';
import { makeFakeCameraItem, makeFakeReviewList, makeFakeSimilarProducts } from '../../utils-for-tests/mocks.ts';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import Product from './product.tsx';

describe('Page: Product', () => {
  const mockCameraItem = makeFakeCameraItem();
  const mockSimilarProducts = makeFakeSimilarProducts();
  const mockReviews = makeFakeReviewList();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Product />, {
      CAMERA: {
        catalog: [],
        isCamerasDataLoading: false,
        status: Status.Idle,
        product: mockCameraItem,
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
      PRODUCT: {
        similarProducts: [...mockSimilarProducts],
        status: Status.Idle,
        isSimilarDataLoading: false,
      },
      REVIEWS: {
        reviews: [...mockReviews],
        status: Status.Idle,
        isReviewsDataLoading: false,
      },
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('camera-item')).toBeInTheDocument();
    expect(screen.getByTestId('product-page')).toBeInTheDocument();
  });
});

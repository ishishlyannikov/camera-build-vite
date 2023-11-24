import { render, screen } from '@testing-library/react';
import ProductTabs from './product-tabs';
import { CameraCategory, CameraLevel, CameraType, ModalName, Status } from '../../const';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';

describe('Component: Product Tabs', () => {
  const info = {
    id: 11,
    name: 'fuck',
    vendorCode: 'BVG78VB',
    type: CameraType.Collection,
    level: CameraLevel.Zero,
    category: CameraCategory.Videocamera,
    description: 'qwerty stream',
    price: 1,
    rating: 1,
    reviewCount: 1,
    previewImg: 'string',
    previewImg2x: 'string',
    previewImgWebp: 'string',
    previewImgWebp2x: 'string',
  };

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ProductTabs camera={info} />, {
      CAMERA: {
        catalog: [],
        status: Status.Idle,
        isCamerasDataLoading: false,
        product: null,
        isProductDataLoading: false,
        modalName: ModalName.Empty,
        selectedProduct: null,
      },
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
  });
});

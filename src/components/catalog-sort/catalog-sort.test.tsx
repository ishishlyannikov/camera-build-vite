import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import { render, screen } from '@testing-library/react';
import CatalogSort from './catalog-sort';
import { makeFakeCameraList } from '../../utils-for-tests/mocks.ts';
import { ModalName, Status } from '../../const.ts';

describe('Component: Catalog Sort', () => {
  const mockCameraList = makeFakeCameraList();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<CatalogSort />, {
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
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('catalog-sort')).toBeInTheDocument();
  });
});

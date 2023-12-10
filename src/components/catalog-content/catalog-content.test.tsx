import { render, screen } from '@testing-library/react';
import { makeFakeCameraList } from '../../utils-for-tests/mocks.ts';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import { ModalName, Status } from '../../const.ts';
import CatalogContent from './catalog-content.tsx';

describe('Component: Catalog Content', () => {
  const mockCameraList = makeFakeCameraList();

  it('should render correctly with fetch.fulfilled cameras', () => {
    const { withStoreComponent } = withStore(<CatalogContent />, {
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
      BASKET: {
        basketProductsList: [...mockCameraList],
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('catalog-content')).toBeInTheDocument();
  });
});

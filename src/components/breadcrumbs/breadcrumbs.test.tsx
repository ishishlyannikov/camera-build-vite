import { render, screen } from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';
import { ModalName, Status } from '../../const';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';

describe('Component: Breadcrumbs', () => {
  it('should render correctly if page is Catalog', () => {
    const { withStoreComponent } = withStore(<Breadcrumbs />, {
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

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });
});

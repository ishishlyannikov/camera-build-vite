import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import { makeFakeCameraList } from '../../utils-for-tests/mocks.ts';
import { ModalName, Status } from '../../const.ts';
import SearchForm from './search-form.tsx';

describe('Component: Search Form', () => {
  const mockCameraList = makeFakeCameraList();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<SearchForm />, {
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

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { makeFakeCameraItem } from '../../../utils-for-tests/mocks.ts';
import { withHistory, withStore } from '../../../utils-for-tests/mock-component.tsx';
import PopupRemoveItem from './popup-remove-item.tsx';
import { ModalName, Status } from '../../../const.ts';

describe('Component: Popup Remove Item', () => {
  const mockCameraItem = makeFakeCameraItem();
  const { name } = mockCameraItem;

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<PopupRemoveItem camera={mockCameraItem} />, {
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

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
    expect(screen.getByAltText(`${name}`)).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getAllByText(/Удалить/i).length).toBe(2);
  });
});

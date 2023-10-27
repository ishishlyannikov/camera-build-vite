import { render, screen } from '@testing-library/react';

import { AppRoute, ModalName, Status } from '../../const';
import { makeFakeCameraList, makeFakePromoList } from '../../utils-for-tests/mocks.ts';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import NotFoundPage from './not-found-page.tsx';

describe('Page: Not Found Page', () => {
  const mockCameraList = makeFakeCameraList();
  const mockPromoList = makeFakePromoList();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<NotFoundPage />, {
      CAMERA: {
        catalog: [...mockCameraList],
        isCamerasDataLoading: false,
        status: Status.Idle,
        product: null,
        isProductDataLoading: false,
        modalName: ModalName.Empty,
        selectedProduct: null,
      },
      PROMO: {
        promo: [...mockPromoList],
        isPromoLoading: false,
        status: Status.Idle,
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);
    const link: HTMLAnchorElement = screen.getByTestId('back-home');
    const expectedText = 'Вернуться на главную';

    expect(link.href).toContain(AppRoute.Main);
    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

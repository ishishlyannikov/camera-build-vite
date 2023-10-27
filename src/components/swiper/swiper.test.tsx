import { render, screen } from '@testing-library/react';
import { makeFakePromoList } from '../../utils-for-tests/mocks.ts';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import SwiperForBanner from './swiper.tsx';
import { Status } from '../../const.ts';

describe('Component: Swiper ', () => {
  const mockPromoList = makeFakePromoList();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<SwiperForBanner />, {
      PROMO: {
        promo: [...mockPromoList],
        isPromoLoading: false,
        status: Status.Idle,
      },
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getAllByTestId('swiper').length).toBe(mockPromoList.length);
  });
});

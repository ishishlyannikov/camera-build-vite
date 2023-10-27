import { render, screen } from '@testing-library/react';
import Banner from './banner';
import { makeFakePromoList } from '../../utils-for-tests/mocks.ts';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';

describe('Component: Banner', () => {
  const mockPromoItem = makeFakePromoList()[0];

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Banner promoProduct={{ ...mockPromoItem }} />, {});
    const expectedText = 'Профессиональная камера от известного производителя';

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByAltText('баннер')).toBeInTheDocument();
    expect(screen.getByText(mockPromoItem.name)).toBeInTheDocument();
  });
});

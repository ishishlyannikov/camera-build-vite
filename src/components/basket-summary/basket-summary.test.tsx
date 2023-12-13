import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils-for-tests/mocks.ts';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import BasketSummary from './basket-summary.tsx';

describe('Component: Basket Summary', () => {
  const mockStore = makeFakeStore();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<BasketSummary />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    const expectedText = 'Если у вас есть промокод на скидку, примените его в этом поле';

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
  });
});

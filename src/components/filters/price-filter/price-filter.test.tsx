import { makeFakeStore } from '../../../utils-for-tests/mocks.ts';
import { withHistory, withStore } from '../../../utils-for-tests/mock-component.tsx';
import { render, screen } from '@testing-library/react';
import PriceFilter from './price-filter.tsx';

describe('Component: Price Filter', () => {
  const mockStore = makeFakeStore();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<PriceFilter isReset={false} />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
  });
});

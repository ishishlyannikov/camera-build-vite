import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import Basket from './basket.tsx';

describe('Page: Basket ', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Basket />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getAllByText('Корзина').length).toBe(2);
  });
});

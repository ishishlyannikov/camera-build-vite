import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import { render, screen } from '@testing-library/react';
import Header from './header';
import { AppRoute } from '../../const';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Header />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const link: HTMLAnchorElement = screen.getByTestId('header-basket');

    expect(link.href).toContain(AppRoute.Basket);
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Гарантии/i)).toBeInTheDocument();
    expect(screen.getByText(/Доставка/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
  });
});

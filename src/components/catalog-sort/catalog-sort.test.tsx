import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import { render, screen } from '@testing-library/react';
import CatalogSort from './catalog-sort';

describe('Component: Catalog Sort', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<CatalogSort />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('catalog-sort')).toBeInTheDocument();
  });
});

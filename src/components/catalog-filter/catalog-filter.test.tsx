import { render, screen } from '@testing-library/react';
import CatalogFilter from './catalog-filter';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';

describe('Component: Catalog Filter', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<CatalogFilter />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('catalog-filter')).toBeInTheDocument();
  });
});

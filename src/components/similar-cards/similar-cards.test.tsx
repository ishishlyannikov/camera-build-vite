import { render, screen } from '@testing-library/react';
import { makeFakeSimilarProducts, makeFakeStore } from '../../utils-for-tests/mocks.ts';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import SimilarCards from './similar-cards.tsx';

describe('Component: Similar Cards', () => {
  const mockSimilarProducts = makeFakeSimilarProducts();
  const mockStore = makeFakeStore();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<SimilarCards cameras={[...mockSimilarProducts]} />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
  });
});

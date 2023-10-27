import { render, screen } from '@testing-library/react';
import Pagination from './pagination';
import { vitest } from 'vitest';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <Pagination totalPageCount={3} nextPage={vitest.fn()} prevPage={vitest.fn()} setPage={vitest.fn()} page={1} />,
      {},
    );

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });
});

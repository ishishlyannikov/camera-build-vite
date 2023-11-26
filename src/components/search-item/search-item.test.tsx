import SearchItem from './search-item.tsx';
import { makeFakeCameraItem } from '../../utils-for-tests/mocks.ts';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import { render, screen } from '@testing-library/react';

describe('Component: Search List Item', () => {
  const mockCamera = makeFakeCameraItem();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <SearchItem product={mockCamera} isCurrent={false} onClick={() => vi.fn()} />,
      {},
    );

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByTestId('search-item')).toBeInTheDocument();
  });
});

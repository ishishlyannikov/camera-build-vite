import { render, screen } from '@testing-library/react';
import ProductCard from './product-card';
import { makeFakeCameraItem, makeFakeStore } from '../../utils-for-tests/mocks.ts';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';

describe('Component: Product Card', () => {
  const mockCameraItem = makeFakeCameraItem();
  const mockStore = makeFakeStore();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ProductCard camera={{ ...mockCameraItem }} />, mockStore);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(mockCameraItem.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockCameraItem.name)).toBeInTheDocument();
    expect(screen.getByText(mockCameraItem.reviewCount)).toBeInTheDocument();
  });
});

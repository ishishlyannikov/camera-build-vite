import { render, screen } from '@testing-library/react';
import ProductCard from './product-card';
import { makeFakeCameraItem } from '../../utils-for-tests/mocks.ts';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';

describe('Component: Product Card', () => {
  const mockCameraItem = makeFakeCameraItem();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ProductCard camera={{ ...mockCameraItem }} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(mockCameraItem.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockCameraItem.name)).toBeInTheDocument();
    expect(screen.getByText(mockCameraItem.reviewCount)).toBeInTheDocument();
  });
});

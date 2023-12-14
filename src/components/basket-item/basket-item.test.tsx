import { render, screen } from '@testing-library/react';
import { makeFakeCameraItem, makeFakeStore } from '../../utils-for-tests/mocks.ts';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import BasketItem from './basket-item.tsx';

describe('Component: Basket Item', () => {
  const mockStore = makeFakeStore();
  const mockCameraItem = makeFakeCameraItem();
  const { name, type, category } = mockCameraItem;

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <BasketItem camera={{ ...mockCameraItem, count: 1 }} onCameraClick={() => mockCameraItem} />,
      mockStore,
    );

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(`${type} ${category}`)).toBeInTheDocument();
    expect(screen.getByAltText(`${name}`)).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});

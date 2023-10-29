import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import RatingItem from './rating-item.tsx';

describe('Component: Rating Item', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<RatingItem rating={2} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getAllByTestId('rating-star').length).toBe(5);
  });
});

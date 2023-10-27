import { render, screen } from '@testing-library/react';

import ReviewItem from './review-item';
import { makeFakeReviewList } from '../../utils-for-tests/mocks.ts';
import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';

describe('Component: Review Item', () => {
  const mockReview = makeFakeReviewList()[0];
  const { userName, review, advantage, disadvantage, createAt } = mockReview;
  const dateAttr = createAt.split('T')[0];
  const dateReview = new Date(dateAttr).toLocaleString('ru', { day: 'numeric', month: 'long' });

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ReviewItem userReview={{ ...mockReview }} />, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(dateReview)).toBeInTheDocument();
    expect(screen.getByText(userName)).toBeInTheDocument();
    expect(screen.getByText(review)).toBeInTheDocument();
    expect(screen.getByText(advantage)).toBeInTheDocument();
    expect(screen.getByText(disadvantage)).toBeInTheDocument();
  });
});

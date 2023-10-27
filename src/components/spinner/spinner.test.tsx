import { render, screen } from '@testing-library/react';
import Spinner from './spinner';
import { withHistory } from '../../utils-for-tests/mock-component.tsx';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(<Spinner />);

    render(preparedComponent);

    expect(screen.getByText(/Загрузка.../i)).toBeInTheDocument();
  });
});

import { withHistory, withStore } from '../../utils-for-tests/mock-component.tsx';
import { render, screen } from '@testing-library/react';
import ModalLayout from './modal-layout.tsx';

describe('Component: Modal Layout', () => {
  const children: JSX.Element = (
    <>
      <h1>Hello, world!</h1>
      <p>Learning to test with Vitest</p>
    </>
  );

  it('should render correctly with AppRoute.Main', () => {
    const { withStoreComponent } = withStore(
      <ModalLayout isOpened={true} closeModal={() => false}>
        {children}
      </ModalLayout>,
      {},
    );

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('modal-container')).toBeInTheDocument();
    expect(screen.getByText(/Hello, world!/i)).toBeInTheDocument();
    expect(screen.getByText(/Learning to test with Vitest/i)).toBeInTheDocument();
  });
});

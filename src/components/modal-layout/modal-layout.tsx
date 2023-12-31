import { ReactNode, RefObject, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
// import ReactFocusLock from 'react-focus-lock';
import FocusLock from 'react-focus-lock';

type ModalLayoutProps = {
  children: ReactNode;
  isOpened: boolean;
  onCloseModal: VoidFunction;
  classname?: string;
};

export default function ModalLayout({ children, isOpened, onCloseModal, classname }: ModalLayoutProps) {
  const ref: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const handleEscClick = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onCloseModal();
      }
    };

    if (isOpened) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscClick);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscClick);
    };
  }, [isOpened, onCloseModal]);

  useEffect(() => {
    const handleOutsideClick = (evt: MouseEvent) => {
      if (!ref?.current?.contains(evt.target as Node)) {
        onCloseModal();
      }
    };

    if (isOpened) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [ref, isOpened, onCloseModal]);

  return createPortal(
    <FocusLock returnFocus disabled={!isOpened}>
      <div
        className={classNames('modal', classname && 'modal--narrow', { 'is-active': isOpened })}
        data-testid='modal-container'
      >
        <div className='modal__wrapper'>
          <div className='modal__overlay' />
          <div className='modal__content' ref={ref}>
            {children}
            <button className='cross-btn' type='button' aria-label='Закрыть попап' onClick={onCloseModal}>
              <svg width={10} height={10} aria-hidden='true'>
                <use xlinkHref='#icon-close' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FocusLock>,
    document.body,
  );
}

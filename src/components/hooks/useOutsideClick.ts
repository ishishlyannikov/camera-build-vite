import { RefObject, useEffect } from 'react';

type outsideClickProps = {
  elementRef: RefObject<HTMLElement | null>;
  closePopup: VoidFunction;
  isPopupOpened: boolean;
};

export default function useOutsideClick({ elementRef, closePopup, isPopupOpened }: outsideClickProps) {
  useEffect(() => {
    if (isPopupOpened) {
      return;
    }

    const handleClick = (e: Event) => {
      if (!elementRef.current) {
        return;
      }
      if (!elementRef.current.contains(e.target as HTMLElement)) {
        closePopup();
      }
    };

    document.addEventListener('mouseup', handleClick);

    return () => {
      document.removeEventListener('mouseup', handleClick);
    };
  }, [elementRef, isPopupOpened, closePopup]);
}

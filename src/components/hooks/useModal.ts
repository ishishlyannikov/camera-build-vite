import { useEffect, useState } from 'react';

type TModal = {
  isOpenedModal: boolean;
  openModal: VoidFunction;
  closeModal: VoidFunction;
};

export const useModal = (): TModal => {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  const openModal = () => setIsOpenedModal(true);

  const closeModal = () => setIsOpenedModal(false);

  useEffect(() => {
    const handleEscClick = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') closeModal();
    };

    if (isOpenedModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscClick);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscClick);
    };
  }, [isOpenedModal]);

  return { isOpenedModal, openModal, closeModal };
};

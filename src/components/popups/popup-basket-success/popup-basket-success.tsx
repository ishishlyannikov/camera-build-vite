import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { setCloseModal } from '../../../store/cameras-data/cameras-data-slice.ts';
import { getModalName } from '../../../store/cameras-data/cameras-data-selectors.ts';
import { AppRoute, ModalName } from '../../../const.ts';
import ModalLayout from '../../modal-layout/modal-layout.tsx';

export default function PopupBasketSuccess() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const modalName = useAppSelector(getModalName);

  const handleCloseModal = () => dispatch(setCloseModal());

  const handleCatalogNavigate = () => {
    navigate(AppRoute.Main);
    handleCloseModal();
  };

  return (
    <ModalLayout
      isOpened={modalName === ModalName.SuccessOrder}
      onCloseModal={handleCloseModal}
      classname='modal--narrow'
    >
      <p className='title title--h4'>Спасибо за покупку</p>
      <svg className='modal__icon' width={80} height={78} aria-hidden='true'>
        <use xlinkHref='#icon-review-success'></use>
      </svg>
      <div className='modal__buttons'>
        <button
          className='btn btn--purple modal__btn modal__btn--fit-width'
          type='button'
          onClick={handleCatalogNavigate}
        >
          Вернуться к покупкам
        </button>
      </div>
    </ModalLayout>
  );
}

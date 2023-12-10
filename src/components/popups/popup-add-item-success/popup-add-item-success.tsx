import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, ModalName } from '../../../const.ts';
import { setCloseModal } from '../../../store/cameras-data/cameras-data-slice.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import { getModalName } from '../../../store/cameras-data/cameras-data-selectors.ts';
import ModalLayout from '../../modal-layout/modal-layout.tsx';

export default function PopupAddItemSuccess() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCloseModal = () => dispatch(setCloseModal());
  const modalName = useAppSelector(getModalName);

  const handleBasketNavigate = () => {
    navigate(AppRoute.Basket);
    handleCloseModal();
  };

  return (
    <ModalLayout
      isOpened={modalName === ModalName.SuccessAdd}
      onCloseModal={handleCloseModal}
      classname='modal--narrow'
    >
      <p className='title title--h4'>Товар успешно добавлен в корзину</p>
      <svg className='modal__icon' width={86} height={80} aria-hidden='true'>
        <use xlinkHref='#icon-success' />
      </svg>
      <div className='modal__buttons'>
        <Link className='btn btn--transparent modal__btn' to={AppRoute.Main} onClick={handleCloseModal}>
          Продолжить покупки
        </Link>
        <button className='btn btn--purple modal__btn modal__btn--fit-width' onClick={handleBasketNavigate}>
          Перейти в корзину
        </button>
      </div>
    </ModalLayout>
  );
}

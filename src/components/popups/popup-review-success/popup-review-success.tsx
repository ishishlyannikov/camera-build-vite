import ModalLayout from '../../modal-layout/modal-layout.tsx';
import { setCloseModal } from '../../store/cameras-data/cameras-data-slice.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import { getModalName } from '../../store/cameras-data/cameras-data-selectors.ts';
import { ModalName } from '../../../const.ts';

export default function PopupReviewSuccess() {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => dispatch(setCloseModal());
  const modalName = useAppSelector(getModalName);

  return (
    <ModalLayout isOpened={modalName === ModalName.SuccessForm} onCloseModal={handleCloseModal}>
      <p className='title title--h4'>Спасибо за отзыв</p>
      <svg className='modal__icon' width={80} height={78} aria-hidden='true'>
        <use xlinkHref='#icon-review-success' />
      </svg>
      <div className='modal__buttons'>
        <button className='btn btn--purple modal__btn modal__btn--fit-width' type='button' onClick={handleCloseModal}>
          Вернуться к покупкам
        </button>
      </div>
    </ModalLayout>
  );
}

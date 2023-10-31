import ReviewForm from '../../review-form/review-form.tsx';
import ModalLayout from '../../modal-layout/modal-layout.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import { setCloseModal } from '../../../store/cameras-data/cameras-data-slice.ts';
import { getModalName } from '../../../store/cameras-data/cameras-data-selectors.ts';
import { ModalName } from '../../../const.ts';
import ReactFocusLock from 'react-focus-lock';
// import ReactFocusLock from 'react-focus-lock';

export default function PopupAddReview() {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => dispatch(setCloseModal());
  const modalName = useAppSelector(getModalName);

  return (
    <ModalLayout isOpened={modalName === ModalName.Reviews} onCloseModal={handleCloseModal}>
      <p className='title title--h4'>Оставить отзыв</p>
      <ReactFocusLock>
        <ReviewForm />
      </ReactFocusLock>
    </ModalLayout>
  );
}

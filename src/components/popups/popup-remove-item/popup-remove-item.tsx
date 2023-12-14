import { Product } from '../../../types/types.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import ModalLayout from '../../modal-layout/modal-layout.tsx';
import { Link } from 'react-router-dom';
import { AppRoute, ModalName } from '../../../const.ts';
import { setCloseModal } from '../../../store/cameras-data/cameras-data-slice.ts';
import { getModalName } from '../../../store/cameras-data/cameras-data-selectors.ts';
import { setBasketRemove } from '../../../store/basket-data/basket-data-slice.ts';
import './popup-remove-item.css';

type PopupRemoveItemProps = {
  camera: Product;
};

export default function PopupRemoveItem({ camera }: PopupRemoveItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const { id, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, vendorCode, type, level } = camera;
  const sourceSrcSet = `../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`;
  const imgSrcSet = `${previewImg2x} 2x`;

  const handleCloseModal = () => dispatch(setCloseModal());
  const modalName = useAppSelector(getModalName);

  const handleRemoveItemButton = () => {
    dispatch(setBasketRemove(id));
    handleCloseModal();
  };

  return (
    <ModalLayout isOpened={modalName === ModalName.RemoveItem} onCloseModal={handleCloseModal}>
      <p className='title title--h4'>Удалить этот товар?</p>
      <div className='basket-item basket-item--short'>
        <div className='basket-item__img'>
          <picture>
            <source type='image/webp' srcSet={sourceSrcSet} />
            <img src={previewImg} srcSet={imgSrcSet} width={140} height={120} alt={name} />
          </picture>
        </div>
        <div className='basket-item__description'>
          <p className='basket-item__title'>{name}</p>
          <ul className='basket-item__list'>
            <li className='basket-item__list-item'>
              <span className='basket-item__article'>Артикул:</span>{' '}
              <span className='basket-item__number'>{vendorCode}</span>
            </li>
            <li className='basket-item__list-item'>{type} фотокамера</li>
            <li className='basket-item__list-item'>{level} уровень</li>
          </ul>
        </div>
      </div>
      <div className='modal__buttons'>
        <button
          className='btn btn--purple modal__btn modal__btn--half-width'
          type='button'
          onClick={handleRemoveItemButton}
        >
          Удалить
        </button>
        <Link
          className='btn btn--transparent modal__btn modal__btn--half-width'
          to={AppRoute.Main}
          onClick={handleCloseModal}
        >
          Продолжить покупки
        </Link>
      </div>
    </ModalLayout>
  );
}

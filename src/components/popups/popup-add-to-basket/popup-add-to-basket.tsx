import { Product } from '../../../types/types.ts';
import ModalLayout from '../../modal-layout/modal-layout.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import { setCloseModal, setModal } from '../../../store/cameras-data/cameras-data-slice.ts';
import { getModalName } from '../../../store/cameras-data/cameras-data-selectors.ts';
import { ModalName } from '../../../const.ts';
import { addProductToBasket } from '../../../store/basket-data/basket-data-slice.ts';

type PopupAddToBasketProps = {
  camera: Product;
};
export default function PopupAddToBasket({ camera }: PopupAddToBasketProps) {
  const dispatch = useAppDispatch();
  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, price, level, vendorCode, type, category } =
    camera;
  const sourceSrcSet = `/${previewImgWebp}, /${previewImgWebp2x} 2x`;
  const imgSrcSet = `${previewImg2x} 2x`;

  const handleAddToBasket = () => {
    dispatch(addProductToBasket(camera));
    dispatch(setModal(ModalName.SuccessAdd));
  };

  const handleCloseModal = () => dispatch(setCloseModal());
  const modalName = useAppSelector(getModalName);

  return (
    <ModalLayout isOpened={modalName === ModalName.AddToBasket} onCloseModal={handleCloseModal}>
      <p className='title title--h4'>Добавить товар в корзину</p>
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
            <li className='basket-item__list-item'>
              {type} {category}
            </li>
            <li className='basket-item__list-item'>{level} уровень</li>
          </ul>
          <p className='basket-item__price'>
            <span className='visually-hidden'>Цена:</span>
            {price.toLocaleString()} ₽
          </p>
        </div>
      </div>
      <div className='modal__buttons'>
        <button className='btn btn--purple modal__btn modal__btn--fit-width' type='button' onClick={handleAddToBasket}>
          <svg width={24} height={16} aria-hidden='true'>
            <use xlinkHref='#icon-add-basket' />
          </svg>
          Добавить в корзину
        </button>
      </div>
    </ModalLayout>
  );
}

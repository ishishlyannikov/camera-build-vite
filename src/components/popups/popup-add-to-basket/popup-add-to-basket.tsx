import { Product } from '../../../types/types.ts';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks/hooks.ts';
import { setModalAddStatus } from '../../store/cameras-data/cameras-data-slice.ts';

type PopupAddToBasketProps = {
  camera: Product;
  isOpened: boolean;
};
export default function PopupAddToBasket({ camera, isOpened }: PopupAddToBasketProps) {
  const dispatch = useAppDispatch();

  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, price, level, vendorCode, type, category } =
    camera;
  const sourceSrcSet = `/${previewImgWebp}, /${previewImgWebp2x} 2x`;
  const imgSrcSet = `${previewImg2x} 2x`;

  // const handleOpenButton = () => {
  //   dispatch(setModalAddStatus(true));
  // };

  const handleCloseButton = () => {
    dispatch(setModalAddStatus(false));
  };

  return (
    <div className={classNames({ 'is-active': isOpened }, 'modal')}>
      <div className='modal__wrapper'>
        <div className='modal__overlay' />
        <div className='modal__content'>
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
                  <span className='basket-item__article'>Артикул::</span>{' '}
                  <span className='basket-item__number'>{vendorCode}</span>
                </li>
                <li className='basket-item__list-item'>
                  {type} {category}
                </li>
                <li className='basket-item__list-item'>{level} уровень</li>
              </ul>
              <p className='basket-item__price'>
                <span className='visually-hidden'>Цена:</span>
                {price} ₽
              </p>
            </div>
          </div>
          <div className='modal__buttons'>
            <button className='btn btn--purple modal__btn modal__btn--fit-width' type='button'>
              <svg width={24} height={16} aria-hidden='true'>
                <use xlinkHref='#icon-add-basket' />
              </svg>
              Добавить в корзину
            </button>
          </div>
          <button className='cross-btn' type='button' aria-label='Закрыть попап' onClick={handleCloseButton}>
            <svg width={10} height={10} aria-hidden='true'>
              <use xlinkHref='#icon-close' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

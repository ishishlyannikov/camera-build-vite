import { Product } from '../../types/types.ts';
import { AppRoute, RATINGS } from '../../const.ts';
import RatingItem from '../rating-item/rating-item.tsx';
import { useState } from 'react';
import PopupAddToBasket from '../popups/popup-add-to-basket/popup-add-to-basket.tsx';
import { Link } from 'react-router-dom';
import { CSSProperties } from 'react';

type SimilarProductsProps = {
  style?: CSSProperties;
  camera: Product;
};

export default function SimilarProduct({ camera, style }: SimilarProductsProps) {
  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, rating, price, reviewCount, id } = camera;
  const sourceSrcSet = `/${previewImgWebp}, /${previewImgWebp2x} 2x`;
  const imgSrcSet = `${previewImg2x} 2x`;

  const [openPopup, setOpenPopup] = useState(false);

  const handlePopupClose = () => {
    setOpenPopup(false);
  };

  return (
    <div className='product-card is-active' style={style}>
      <div className='product-card__img'>
        <picture>
          <source type='image/webp' srcSet={sourceSrcSet} />
          <img src={previewImg} srcSet={imgSrcSet} width='280' height='240' alt={name} />
        </picture>
      </div>
      <div className='product-card__info'>
        <div className='rate product-card__rate'>
          {RATINGS.map((item) => (
            <RatingItem key={item} item={item} rating={rating} />
          ))}
          <p className='visually-hidden'>{`Рейтинг: ${rating}`}</p>
          <p className='rate__count'>
            <span className='visually-hidden'>Всего оценок:</span>
            {reviewCount}
          </p>
        </div>
        <p className='product-card__title'>{name}</p>
        <p className='product-card__price'>
          <span className='visually-hidden'>Цена:</span>
          {price} ₽
        </p>
      </div>
      <div className='product-card__buttons'>
        <button className='btn btn--purple product-card__btn' type='button' onClick={() => setOpenPopup(true)}>
          Купить
        </button>
        {openPopup ? <PopupAddToBasket camera={camera} isOpened={openPopup} onModalClose={handlePopupClose} /> : null}
        <Link className='btn btn--transparent' to={`${AppRoute.Product}/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

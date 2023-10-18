import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/types.ts';
import { AppRoute, RATINGS } from '../../const.ts';
import RatingItem from '../rating-item/rating-item.tsx';
import { setModalAddStatus, setSelectedProduct } from '../store/cameras-data/cameras-data-slice.ts';
// import { setOpenModal } from '../store/cameras-data/cameras-data-slice.ts';
import { useAppDispatch } from '../hooks/hooks.ts';

type SimilarProductsProps = {
  style?: CSSProperties;
  camera: Product;
};

export default function SimilarProduct({ camera, style }: SimilarProductsProps) {
  const dispatch = useAppDispatch();

  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, rating, price, reviewCount, id } = camera;
  const sourceSrcSet = `/${previewImgWebp}, /${previewImgWebp2x} 2x`;
  const imgSrcSet = `${previewImg2x} 2x`;

  const handleButtonClick = () => {
    dispatch(setSelectedProduct(camera));
    dispatch(setModalAddStatus(true));
  };

  return (
    <>
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
          <button className='btn btn--purple product-card__btn' type='button' onClick={handleButtonClick}>
            Купить
          </button>
          <Link className='btn btn--transparent' to={`${AppRoute.Product}/${id}/characteristics`}>
            Подробнее
          </Link>
        </div>
      </div>
    </>
  );
}

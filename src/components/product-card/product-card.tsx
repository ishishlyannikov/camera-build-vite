import { Link } from 'react-router-dom';
import { Product } from '../../types/types.ts';
import { AppRoute, ModalName } from '../../const.ts';
import RatingItem from '../rating-item/rating-item.tsx';
import { setModal, setSelectedProduct } from '../../store/cameras-data/cameras-data-slice.ts';
import { useAppDispatch, useAppSelector } from '../hooks/hooks.ts';
import { getBasketProductsList } from '../../store/basket-data/basket-data-selectors.ts';

type ProductCardProps = {
  camera: Product;
};

export default function ProductCard({ camera }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const basketProductList = useAppSelector(getBasketProductsList);

  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, rating, price, id, reviewCount } = camera;
  const sourceSrcSet = `/${previewImgWebp}, /${previewImgWebp2x} 2x`;
  const imgSrcSet = `${previewImg2x} 2x`;

  const isInBasket = basketProductList.find((item) => item.id === id);

  const handleAddToBasketClick = () => {
    dispatch(setSelectedProduct(camera));
    dispatch(setModal(ModalName.AddToBasket));
  };

  return (
    <div className='product-card is-active' style={{ width: '100%' }}>
      <div className='product-card__img'>
        <picture>
          <source type='image/webp' srcSet={sourceSrcSet} />
          <img src={previewImg} srcSet={imgSrcSet} width='280' height='240' alt={name} />
        </picture>
      </div>
      <div className='product-card__info'>
        <div className='rate product-card__rate'>
          <RatingItem rating={rating} />
          <p className='visually-hidden'>{`Рейтинг: ${rating}`}</p>
          <p className='rate__count'>
            <span className='visually-hidden'>Всего оценок:</span>
            {reviewCount}
          </p>
        </div>
        <p className='product-card__title'>{name}</p>
        <p className='product-card__price'>
          <span className='visually-hidden'>Цена:</span>
          {price.toLocaleString()} ₽
        </p>
      </div>
      <div className='product-card__buttons'>
        {isInBasket !== undefined ? (
          <Link className='btn btn--purple-border product-card__btn product-card__btn--in-cart' to={AppRoute.Basket}>
            <svg width='16' height='16' aria-hidden='true'>
              <use xlinkHref='#icon-basket'></use>
            </svg>
            В корзине
          </Link>
        ) : (
          <button className='btn btn--purple product-card__btn' type='button' onClick={handleAddToBasketClick}>
            Купить
          </button>
        )}
        <Link className='btn btn--transparent' to={`${AppRoute.Product}/${id}/characteristics`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

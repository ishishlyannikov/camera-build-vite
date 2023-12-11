import { Product } from '../../types/types.ts';
import { ChangeEvent, useState } from 'react';

type BasketItemProps = {
  camera: Product;
  count: number;
};

export default function BasketItem({ camera, count }: BasketItemProps) {
  const [itemsCount, setItemsCount] = useState(count || '1');

  const { name, vendorCode, type, category, level, price, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x } =
    camera;
  const sourceSrcSet = `../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`;
  const imgSrcSet = `../../${previewImg2x} 2x`;
  const imgPreview = `../../${previewImg}`;

  const productCost = price * Number(itemsCount);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = +evt.target.value;
    if (value >= 1 && value <= 99) {
      setItemsCount(value);
    }
    if (evt.target.value === '') {
      setItemsCount('');
    }
  };

  const handleDecreaseButton = () => {
    const prev = Number(itemsCount) - 1;
    setItemsCount(prev >= 1 ? prev : itemsCount);
  };

  const handleIncreaseButton = () => {
    const next = Number(itemsCount) + 1;
    setItemsCount(next <= 99 ? next : itemsCount);
  };

  return (
    <li className='basket-item'>
      <div className='basket-item__img'>
        <picture>
          <source type='image/webp' srcSet={sourceSrcSet} />
          <img src={imgPreview} srcSet={imgSrcSet} width={140} height={120} alt={name} />
        </picture>
      </div>
      <div className='basket-item__description'>
        <p className='basket-item__title'>{name}</p>
        <ul className='basket-item__list'>
          <li className='basket-item__list-item'>
            <span className='basket-item__article'>Артикул:</span>{' '}
            <span className='basket-item__number'>{vendorCode}</span>
          </li>
          <li className='basket-item__list-item'>{`${type} ${category}`}</li>
          <li className='basket-item__list-item'>{level} уровень</li>
        </ul>
      </div>
      <p className='basket-item__price'>
        <span className='visually-hidden'>Цена:</span> {price.toLocaleString()} ₽
      </p>
      <div className='quantity'>
        <button
          className='btn-icon btn-icon--prev'
          aria-label='уменьшить количество товара'
          onClick={handleDecreaseButton}
          disabled={+itemsCount <= 1}
        >
          <svg width={7} height={12} aria-hidden='true'>
            <use xlinkHref='#icon-arrow' />
          </svg>
        </button>
        <label className='visually-hidden' htmlFor='counter1' />
        <input
          type='number'
          id='counter1'
          value={itemsCount}
          onChange={handleInputChange}
          aria-label='количество товара'
        />
        <button
          className='btn-icon btn-icon--next'
          aria-label='увеличить количество товара'
          onClick={handleIncreaseButton}
          disabled={+itemsCount >= 99}
        >
          <svg width={7} height={12} aria-hidden='true'>
            <use xlinkHref='#icon-arrow' />
          </svg>
        </button>
      </div>
      <div className='basket-item__total-price'>
        <span className='visually-hidden'>Общая цена:</span>
        {productCost.toLocaleString()} ₽
      </div>
      <button className='cross-btn' type='button' aria-label='Удалить товар'>
        <svg width={10} height={10} aria-hidden='true'>
          <use xlinkHref='#icon-close' />
        </svg>
      </button>
    </li>
  );
}

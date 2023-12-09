import { Product } from '../../types/types.ts';

type BasketItemProps = {
  camera: Product;
};

export default function BasketItem({ camera }: BasketItemProps) {
  const { name, vendorCode, type, category, level, price, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x } =
    camera;
  const sourceSrcSet = `../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`;
  const imgSrcSet = `../../${previewImg2x} 2x`;
  const imgPreview = `../../${previewImg}`;

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
        <button className='btn-icon btn-icon--prev' aria-label='уменьшить количество товара'>
          <svg width={7} height={12} aria-hidden='true'>
            <use xlinkHref='#icon-arrow' />
          </svg>
        </button>
        <label className='visually-hidden' htmlFor='counter1' />
        <input type='number' id='counter1' defaultValue={2} min={1} max={99} aria-label='количество товара' />
        <button className='btn-icon btn-icon--next' aria-label='увеличить количество товара'>
          <svg width={7} height={12} aria-hidden='true'>
            <use xlinkHref='#icon-arrow' />
          </svg>
        </button>
      </div>
      <div className='basket-item__total-price'>
        <span className='visually-hidden'>Общая цена:</span>
        {price.toLocaleString()} ₽
      </div>
      <button className='cross-btn' type='button' aria-label='Удалить товар'>
        <svg width={10} height={10} aria-hidden='true'>
          <use xlinkHref='#icon-close' />
        </svg>
      </button>
    </li>
  );
}

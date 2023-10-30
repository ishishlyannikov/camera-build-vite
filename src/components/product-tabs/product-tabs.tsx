import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../types/types.ts';
import classNames from 'classnames';

type ProductTabsProps = {
  camera: Product;
};

export default function ProductTabs({ camera }: ProductTabsProps) {
  const navigate = useNavigate();
  const { vendorCode, type, level, category, description } = camera;

  const { tab } = useParams();

  const activeDescription = tab === 'description';

  const handleCharacteristicsButton = useCallback(() => {
    navigate(`/product/${camera.id}/characteristics`);
  }, [camera, navigate]);

  const handleDescriptionButton = useCallback(() => {
    navigate(`/product/${camera.id}/description`);
  }, [camera, navigate]);

  const separatedDescription = description.split('.');

  return (
    <div className='tabs product__tabs'>
      <div className='tabs__controls product__tabs-controls'>
        <button
          className={classNames('tabs__control', { 'is-active': !activeDescription })}
          type='button'
          onClick={handleCharacteristicsButton}
        >
          Характеристики
        </button>
        <button
          className={classNames('tabs__control', { 'is-active': activeDescription })}
          type='button'
          onClick={handleDescriptionButton}
        >
          Описание
        </button>
      </div>
      <div className='tabs__content'>
        <div className={classNames('tabs__element', { 'is-active': !activeDescription })}>
          <ul className='product__tabs-list'>
            <li className='item-list'>
              <span className='item-list__title'>Артикул:</span> <p className='item-list__text'> {vendorCode}</p>
            </li>
            <li className='item-list'>
              <span className='item-list__title'>Категория:</span>
              <p className='item-list__text'>{category}</p>
            </li>
            <li className='item-list'>
              <span className='item-list__title'>Тип камеры:</span>
              <p className='item-list__text'>{type}</p>
            </li>
            <li className='item-list'>
              <span className='item-list__title'>Уровень:</span>
              <p className='item-list__text'>{level}</p>
            </li>
          </ul>
        </div>
        <div className={classNames('tabs__element', { 'is-active': activeDescription })}>
          <div className='product__tabs-text'>
            <p>{separatedDescription[0]}</p>
            {separatedDescription.length > 1 && <p>{separatedDescription.slice(1).join('.')}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

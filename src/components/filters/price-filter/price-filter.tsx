import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { KeyboardKey } from '../../../const.ts';
import {
  getCamerasList,
  getFilteredCatalog,
  getMaxPrice,
  getMinPrice,
} from '../../../store/cameras-data/cameras-data-selectors.ts';
import { setMaxPrice, setMinPrice } from '../../../store/cameras-data/cameras-data-slice.ts';
import { getPrice } from '../../../utils.ts';
import { toast } from 'react-toastify';

export type PriceFilterProps = {
  isReset: boolean;
};

export default function PriceFilter({ isReset }: PriceFilterProps) {
  const dispatch = useAppDispatch();
  const sortedCatalog = useAppSelector(getFilteredCatalog);
  const catalog = useAppSelector(getCamerasList);
  const currentMinPrice = useAppSelector(getMinPrice);
  const currentMaxPrice = useAppSelector(getMaxPrice);

  const minSortedPrice = Number(getPrice(sortedCatalog, 'min'));
  const maxSortedPrice = Number(getPrice(sortedCatalog, 'max'));

  const minCatalogPrice = Number(getPrice(catalog, 'min'));
  const maxCatalogPrice = Number(getPrice(catalog, 'max'));

  const [minPriceValue, setMinPriceValue] = useState(0 || currentMinPrice);
  const [maxPriceValue, setMaxPriceValue] = useState(0 || currentMaxPrice);

  const handleMinPriceInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = +evt.target.value.replaceAll('-', '');
    if (evt.target.value === '') {
      setMinPriceValue(minCatalogPrice);
      dispatch(setMinPrice(0));
    }
    setMinPriceValue(price);
  };

  const handleMaxPriceInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = +evt.target.value.replaceAll('-', '');
    if (evt.target.value === '') {
      setMaxPriceValue(maxCatalogPrice);
      dispatch(setMaxPrice(0));
    }
    setMaxPriceValue(price);
  };

  const validatePriceInput = () => {
    if (minPriceValue && minPriceValue < minSortedPrice) {
      setMinPriceValue(minSortedPrice);
      dispatch(setMinPrice(minSortedPrice));
      return;
    }
    if (maxPriceValue && maxPriceValue > maxSortedPrice) {
      setMaxPriceValue(maxSortedPrice);
      dispatch(setMaxPrice(maxSortedPrice));
      return;
    }
    if (maxPriceValue && maxPriceValue < minSortedPrice) {
      setMaxPriceValue(minSortedPrice);
      dispatch(setMaxPrice(minSortedPrice));
      return;
    }
    if (minPriceValue && minPriceValue > maxSortedPrice) {
      setMinPriceValue(maxSortedPrice);
      dispatch(setMinPrice(maxSortedPrice));
      return;
    }
    if (minPriceValue && maxPriceValue && maxPriceValue < minPriceValue) {
      toast.warn('минимальная цена не может быть больше максимальной');
      setMaxPriceValue(0);
      dispatch(setMaxPrice(maxSortedPrice));
      return;
    }
    dispatch(setMinPrice(minPriceValue));
    dispatch(setMaxPrice(maxPriceValue));
  };

  const handlePriceBlur = () => {
    validatePriceInput();
  };

  const handlePriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === KeyboardKey.Enter) {
      validatePriceInput();
    }
  };

  useEffect(() => {
    if (isReset) {
      setMinPriceValue(0);
      setMaxPriceValue(0);
    }
  }, [isReset]);

  return (
    <fieldset className='catalog-filter__block'>
      <legend className='title title--h5'>Цена, ₽</legend>
      <div className='catalog-filter__price-range'>
        <div className='custom-input'>
          <label>
            <input
              type='number'
              name='price_gte'
              placeholder={minSortedPrice.toString()}
              onChange={handleMinPriceInputChange}
              onKeyDown={handlePriceKeyDown}
              onBlur={handlePriceBlur}
              value={minPriceValue || ''}
            />
          </label>
        </div>
        <div className='custom-input'>
          <label>
            <input
              type='number'
              name='price_lte'
              placeholder={maxSortedPrice.toString()}
              onChange={handleMaxPriceInputChange}
              onKeyDown={handlePriceKeyDown}
              onBlur={handlePriceBlur}
              value={maxPriceValue || ''}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

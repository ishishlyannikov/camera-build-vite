import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { KeyboardKey } from '../../../const.ts';
import {
  getCamerasList,
  getMaxPrice,
  getMinPrice,
  getSortedCatalog,
} from '../../../store/cameras-data/cameras-data-selectors.ts';
import { setMaxPrice, setMinPrice } from '../../../store/cameras-data/cameras-data-slice.ts';
import { getPrice } from '../../../utils.ts';

export type FilterProps = {
  isReset: boolean;
};

export default function FilterByPrice({ isReset }: FilterProps): JSX.Element {
  const dispatch = useAppDispatch();
  const sortedCatalog = useAppSelector(getSortedCatalog);
  const catalog = useAppSelector(getCamerasList);
  const currentMinPrice = useAppSelector(getMinPrice);
  const currentMaxPrice = useAppSelector(getMaxPrice);

  const minSortedPrice = getPrice(sortedCatalog, 'min');
  const maxSortedPrice = getPrice(sortedCatalog, 'max');

  const minCatalogPrice = getPrice(catalog, 'min');
  const maxCatalogPrice = getPrice(catalog, 'max');

  const [minPriceValue, setMinPriceValue] = useState(0 || currentMinPrice);
  const [maxPriceValue, setMaxPriceValue] = useState(0 || currentMaxPrice);

  const handleMinPriceInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = +evt.target.value < 0 || evt.target.value === '-0' ? '' : evt.target.value;
    if (evt.target.value === '') {
      setMinPriceValue(+minCatalogPrice);
      dispatch(setMinPrice(0));
    }
    setMinPriceValue(+price);
  };

  const handleMaxPriceInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = +evt.target.value < 0 || evt.target.value === '-0' ? '' : evt.target.value;
    if (evt.target.value === '') {
      setMaxPriceValue(+maxCatalogPrice);
      dispatch(setMaxPrice(0));
    }
    setMaxPriceValue(+price);
  };

  const checkMinPrice = () => {
    if (!minPriceValue) {
      setMinPriceValue(0);
      dispatch(setMinPrice(0));
    }

    if (minPriceValue < +minSortedPrice) {
      setMinPriceValue(+minSortedPrice);
      dispatch(setMinPrice(+minSortedPrice));
    }

    if (minPriceValue > +maxSortedPrice) {
      setMinPriceValue(+maxSortedPrice);
      dispatch(setMinPrice(+maxSortedPrice));
    }

    dispatch(setMinPrice(minPriceValue));
  };

  const checkMaxPrice = () => {
    if (!maxPriceValue) {
      setMaxPriceValue(0);
      dispatch(setMaxPrice(0));
    }

    if (maxPriceValue > +maxSortedPrice) {
      setMaxPriceValue(+maxSortedPrice);
      dispatch(setMaxPrice(+maxSortedPrice));
    }

    if (maxPriceValue < minPriceValue) {
      setMaxPriceValue(minPriceValue);
      dispatch(setMaxPrice(minPriceValue));
    }

    dispatch(setMaxPrice(maxPriceValue));
  };

  const handleMinPriceBlur = () => {
    checkMinPrice();
  };

  const handleMaxPriceBlur = () => {
    checkMaxPrice();
  };

  const handleMinPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === KeyboardKey.Enter) {
      checkMinPrice();
    }
  };

  const handleMaxPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === KeyboardKey.Enter) {
      checkMaxPrice();
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
              name='price'
              placeholder={minSortedPrice}
              onChange={handleMinPriceInputChange}
              onKeyDown={handleMinPriceKeyDown}
              onBlur={handleMinPriceBlur}
              value={minPriceValue || ''}
            />
          </label>
        </div>
        <div className='custom-input'>
          <label>
            <input
              type='number'
              name='priceUp'
              placeholder={maxSortedPrice}
              onChange={handleMaxPriceInputChange}
              onKeyDown={handleMaxPriceKeyDown}
              onBlur={handleMaxPriceBlur}
              value={maxPriceValue || ''}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

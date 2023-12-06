import { useAppDispatch, useAppSelector } from '../hooks/hooks.ts';
import { getCategoryFilter, getLevelFilter, getTypeFilter } from '../../store/cameras-data/cameras-data-selectors.ts';
import { useEffect, useState } from 'react';
import {
  setCategoryFilter,
  setFiltersReset,
  setLevelFilter,
  setTypeFilter,
} from '../../store/cameras-data/cameras-data-slice.ts';
import { CameraCategory, CameraLevel, CameraType, FILTER_PARAMS } from '../../const.ts';
import PriceFilter from '../filters/price-filter/price-filter.tsx';
import { useSearchParams } from 'react-router-dom';

export default function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = useAppSelector(getCategoryFilter);
  const currentType = useAppSelector(getTypeFilter);
  const currentLevel = useAppSelector(getLevelFilter);

  const [isReset, setIsReset] = useState(false);

  const isSnapshot = currentType.includes(CameraType.Snapshot);
  const isFilm = currentType.includes(CameraType.Film);
  const isVideoCamera = currentCategory === CameraCategory.Videocamera;

  const handleCategoryChange = (category: CameraCategory) => {
    if (currentCategory !== category) {
      dispatch(setCategoryFilter(category));
    } else {
      dispatch(setCategoryFilter(null));
    }
  };

  const handleTypeChange = (type: CameraType) => {
    dispatch(setTypeFilter(type));
  };

  const handleLevelChange = (level: CameraLevel) => {
    dispatch(setLevelFilter(level));
  };

  const handleFilterReset = () => {
    const newParams = Array.from(searchParams.entries()).filter(([key]) => !FILTER_PARAMS.includes(key));
    setSearchParams(newParams);
    setIsReset(true);
    dispatch(setFiltersReset());
  };

  useEffect(() => {
    if (isReset) {
      setIsReset(false);
    }
  }, [isReset]);

  return (
    <div className='catalog-filter' data-testid='catalog-filter'>
      <form action='#'>
        <h2 className='visually-hidden'>Фильтр</h2>
        <PriceFilter isReset={isReset} />
        <fieldset className='catalog-filter__block'>
          <legend className='title title--h5'>Категория</legend>
          {Object.values(CameraCategory).map((category) => (
            <div className='custom-checkbox catalog-filter__item' key={category}>
              <label>
                <input
                  type='checkbox'
                  name={category.toLowerCase()}
                  checked={currentCategory === category}
                  onChange={() => handleCategoryChange(category)}
                  disabled={category === CameraCategory.Videocamera && (isFilm || isSnapshot)}
                />
                <span className='custom-checkbox__icon'></span>
                <span className='custom-checkbox__label'>{category}</span>
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset className='catalog-filter__block'>
          <legend className='title title--h5'>Тип камеры</legend>
          {Object.values(CameraType).map((type) => (
            <div className='custom-checkbox catalog-filter__item' key={type}>
              <label>
                <input
                  type='checkbox'
                  name={type.toLowerCase()}
                  checked={currentType.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  disabled={isVideoCamera && (type === CameraType.Snapshot || type === CameraType.Film)}
                />
                <span className='custom-checkbox__icon'></span>
                <span className='custom-checkbox__label'>{type}</span>
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset className='catalog-filter__block'>
          <legend className='title title--h5'>Уровень</legend>
          {Object.values(CameraLevel).map((level) => (
            <div className='custom-checkbox catalog-filter__item' key={level}>
              <label>
                <input
                  type='checkbox'
                  name={level.toLowerCase()}
                  checked={currentLevel.includes(level)}
                  onChange={() => handleLevelChange(level)}
                />
                <span className='custom-checkbox__icon'></span>
                <span className='custom-checkbox__label'>{level}</span>
              </label>
            </div>
          ))}
        </fieldset>
        <button onClick={handleFilterReset} className='btn catalog-filter__reset-btn' type='reset'>
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

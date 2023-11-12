import { useAppSelector } from '../hooks/hooks.ts';
import { getCamerasList } from '../../store/cameras-data/cameras-data-selectors.ts';
import SearchItem from '../search-item/search-item.tsx';
import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoute, MIN_SEARCH_INPUT_LENGTH, SCROLLER_COUNT } from '../../const.ts';
import classNames from 'classnames';
import ReactFocusLock from 'react-focus-lock';

export default function SearchForm() {
  const cameras = useAppSelector(getCamerasList);
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const ref: RefObject<HTMLInputElement> = useRef(null);

  const searchedCameras = cameras.filter((camera) => camera.name.toLowerCase().includes(value.toLowerCase()));

  const onSearchItemClick = (id: number) => {
    navigate(generatePath(`${AppRoute.Product}/${id}/characteristics`));
    setValue('');
  };

  const handleTextInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleFormReset = () => {
    setValue('');
  };
  const handleOutsideClick = (evt: MouseEvent) => {
    if (ref.current && !ref.current?.contains(evt.target as Node)) {
      handleFormReset();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div
      className={classNames(
        { 'list-opened': value.length >= MIN_SEARCH_INPUT_LENGTH && searchedCameras.length },
        'form-search',
      )}
    >
      <ReactFocusLock disabled={!value}>
        <form>
          <label>
            <svg className='form-search__icon' width={16} height={16} aria-hidden='true'>
              <use xlinkHref='#icon-lens' />
            </svg>
            <input
              className='form-search__input'
              type='text'
              autoComplete='off'
              placeholder='Поиск по сайту'
              onChange={handleTextInput}
              ref={ref}
              value={value}
            />
          </label>
          <ul className={classNames({ scroller: searchedCameras.length > SCROLLER_COUNT }, 'form-search__select-list')}>
            {searchedCameras.map((camera) => (
              <SearchItem key={camera.id} product={camera} onClick={onSearchItemClick} />
            ))}
          </ul>
        </form>
        <button className='form-search__reset' type='reset' onClick={handleFormReset}>
          <svg width={10} height={10} aria-hidden='true'>
            <use xlinkHref='#icon-close' />
          </svg>
          <span className='visually-hidden'>Сбросить поиск</span>
        </button>
      </ReactFocusLock>
    </div>
  );
}

import { useAppSelector } from '../hooks/hooks.ts';
import { getCamerasList } from '../../store/cameras-data/cameras-data-selectors.ts';
import SearchItem from '../search-item/search-item.tsx';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoute, KeyboardKey, MIN_SEARCH_INPUT_LENGTH, SCROLLER_COUNT } from '../../const.ts';
import classNames from 'classnames';
import ReactFocusLock from 'react-focus-lock';
import useKeyboard from '../hooks/useKeyboard.ts';
import { useOutsideClick } from '../hooks/useOutsideClick.ts';

export default function SearchForm() {
  const cameras = useAppSelector(getCamerasList);

  const [inputValue, setInputValue] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const navigate = useNavigate();

  const ref = useRef<HTMLInputElement>(null);
  const formRef = useRef(null);

  const searchedCameras = cameras.filter(
    (camera) =>
      camera.name.toLowerCase().includes(inputValue.toLowerCase()) && inputValue.length >= MIN_SEARCH_INPUT_LENGTH,
  );

  const onSearchItemClick = (id: number) => {
    navigate(generatePath(`${AppRoute.Product}/${id}/characteristics`));
    setInputValue('');
  };

  const handleTextInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const handleFormReset = () => {
    ref.current?.focus();
    setInputValue('');
  };

  const arrowUp = useKeyboard(KeyboardKey.ArrowUp);
  const arrowDown = useKeyboard(KeyboardKey.ArrowDown);
  const escKey = useKeyboard(KeyboardKey.Esc);

  const isArrowUpPressed = inputValue && searchedCameras.length && arrowUp;
  const isArrowDownPressed = inputValue && searchedCameras.length && arrowDown;
  const isEscPressed = inputValue && escKey;

  useOutsideClick(formRef, () => setInputValue(''));

  useEffect(() => {
    if (isEscPressed) {
      handleFormReset();
    }
    if (searchedCameras.length && isArrowUpPressed) {
      setFocusedIndex((prev) => (prev ? prev - 1 : prev));

      if (!focusedIndex) {
        ref.current?.focus();
        setFocusedIndex(-1);
      }
    }
    if (searchedCameras.length && isArrowDownPressed) {
      setFocusedIndex((prev) => (prev < searchedCameras.length - 1 ? prev + 1 : prev));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArrowDownPressed, isArrowUpPressed, isEscPressed, searchedCameras.length]);

  return (
    <div
      className={classNames({ 'list-opened': inputValue.length }, 'form-search')}
      ref={formRef}
      tabIndex={-1}
      data-testid='search-form'
    >
      <ReactFocusLock disabled={!inputValue}>
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
              value={inputValue}
            />
          </label>
          <ul
            className={classNames(
              { hidden: !searchedCameras.length },
              { scroller: searchedCameras.length > SCROLLER_COUNT },
              'form-search__select-list',
            )}
          >
            {searchedCameras.map((camera, i) => (
              <SearchItem key={camera.id} product={camera} onClick={onSearchItemClick} isCurrent={i === focusedIndex} />
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

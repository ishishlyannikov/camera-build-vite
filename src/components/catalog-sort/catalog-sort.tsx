import { useAppDispatch, useAppSelector } from '../hooks/hooks.ts';
import { getSortBy, getSortOrder } from '../../store/cameras-data/cameras-data-selectors.ts';
import { SortBy, SortOrder } from '../../const.ts';
import { setSortBy, setSortOrder } from '../../store/cameras-data/cameras-data-slice.ts';

export default function CatalogSort() {
  const dispatch = useAppDispatch();

  const selectedSorting = useAppSelector(getSortBy);
  const selectedSortingOrder = useAppSelector(getSortOrder);

  const handleSortingClick = (value: SortBy) => {
    dispatch(setSortBy(value));
  };

  const handleSortOrderClick = (value: SortOrder) => {
    dispatch(setSortOrder(value));
  };

  return (
    <div className='catalog-sort' data-testid='catalog-sort'>
      <form action='#'>
        <div className='catalog-sort__inner'>
          <p className='title title--h5'>Сортировать:</p>
          <div className='catalog-sort__type'>
            {Object.entries(SortBy).map(([type, value]) => (
              <div className='catalog-sort__btn-text' key={type}>
                <input
                  type='radio'
                  id={`sort${type}`}
                  name='sort'
                  onChange={() => handleSortingClick(value)}
                  checked={value === selectedSorting}
                />
                <label htmlFor={`sort${type}`}>{value}</label>
              </div>
            ))}
          </div>

          <div className='catalog-sort__order'>
            {Object.entries(SortOrder).map(([type, value]) => (
              <div className={`catalog-sort__btn catalog-sort__btn--${type.toLowerCase()}`} key={type}>
                <input
                  type='radio'
                  id={type.toLowerCase()}
                  name='sort-icon'
                  aria-label={value}
                  onChange={() => handleSortOrderClick(value)}
                  checked={value === selectedSortingOrder}
                />
                <label htmlFor={type.toLowerCase()}>
                  <svg width={16} height={14} aria-hidden='true'>
                    <use xlinkHref='#icon-sort' />
                  </svg>
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

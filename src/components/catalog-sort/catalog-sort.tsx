import { useAppDispatch, useAppSelector } from '../hooks/hooks.ts';
import { getSortBy, getSortOrder } from '../../store/cameras-data/cameras-data-selectors.ts';
import { QueryString, SortBy, SortOrder } from '../../const.ts';
import { setSortBy, setSortOrder } from '../../store/cameras-data/cameras-data-slice.ts';
import { useLocation, useSearchParams } from 'react-router-dom';

export default function CatalogSort() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const selectedSorting = useAppSelector(getSortBy);
  const selectedSortingOrder = useAppSelector(getSortOrder);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortType = searchParams.get(QueryString.Sort);
  const currentSortOrder = searchParams.get(QueryString.Order);

  const currentParams = new URLSearchParams(location.search);

  const handleSortingClick = (value: SortBy) => {
    currentParams.set(QueryString.Sort, value);
    currentParams.set(QueryString.Order, currentSortOrder === null ? SortOrder.Up : String(currentSortOrder));

    dispatch(setSortBy(value));
    setSearchParams(currentParams);
  };

  const handleSortOrderClick = (value: SortOrder) => {
    searchParams.set(QueryString.Order, value);
    searchParams.set(QueryString.Sort, currentSortType === null ? SortBy.Price : String(currentSortType));

    dispatch(setSortOrder(value));
    setSearchParams(searchParams);
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
